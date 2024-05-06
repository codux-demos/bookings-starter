import { currentCart } from '@wix/ecom';
import { OAuthStrategy, createClient } from '@wix/sdk';
import { services, extendedBookings, bookings } from '@wix/bookings'
import { tickets } from '@wix/events'
import { redirects } from '@wix/redirects';
import React, { FC, useMemo } from 'react';
import Cookies from 'js-cookie';
import { SWRConfig } from 'swr';
import { ROUTES } from '../router/config';

export const WIX_SESSION_TOKEN = 'wix_refreshToken';

function getTokens() {
    const tokens = Cookies.get(WIX_SESSION_TOKEN);
    return tokens ? JSON.parse(tokens) : undefined;
}

function getWixClient() {
    return createClient({
        modules: {
            tickets,
            currentCart,
            redirects,
            services,
            bookings: extendedBookings,
            bookingsActions: bookings,
        },
        auth: OAuthStrategy({
            clientId: import.meta.env.VITE_WIX_CLIENT_ID || process.env.VITE_WIX_CLIENT_ID || '',
            tokens: getTokens(),
        }),
    });
}

function getWixApi(wixClient: ReturnType<typeof getWixClient>) {
    return {
        getAllLessons: async () => {
            return (await wixClient.services.queryServices().find()).items;
        },
        getPromotedLessons: async () => {
            return (await wixClient.services.queryServices().limit(4).find()).items;
        },
        getLessonBySlug: async (slug?: string) => {
            if (!slug) return
            return (await wixClient!.services.queryServices()
                .eq('mainSlug.name', decodeURIComponent(slug))
                .limit(1)
                .find()).items[0];
        },
        getMyUpcomingBookings: async () => await wixClient!.bookings.queryExtendedBookings(
            {
                filter: { startDate: { $gte: new Date().toISOString() } },
                sort: [
                    {
                        fieldName: 'startDate',
                        order: extendedBookings.SortOrder.ASC,
                    },
                ],
            },
            { withBookingAllowedActions: true }
        ),
        getMyBookingHistory: async () => await wixClient!.bookings.queryExtendedBookings(
            {
                filter: { startDate: { $lt: new Date().toISOString() } },
                sort: [
                    {
                        fieldName: 'startDate',
                        order: extendedBookings.SortOrder.DESC,
                    },
                ],
            },
            { withBookingAllowedActions: true }
        ),
        cancelBooking: async ({ _id, revision }: Pick<extendedBookings.Booking, '_id' | 'revision'>) => await wixClient!.bookingsActions.cancelBooking(_id!, {
            revision: revision!,
        }),
        getCart: () => {
            return wixClient.currentCart.getCurrentCart();
        },
        getCartTotals: () => {
            return wixClient.currentCart.estimateCurrentCartTotals();
        },
        updateCartItemQuantity: async (id: string | undefined | null, quantity: number) => {
            const result = await wixClient.currentCart.updateCurrentCartLineItemQuantity([
                {
                    _id: id || undefined,
                    quantity,
                },
            ]);
            return result.cart;
        },
        removeItemFromCart: async (id: string) => {
            const result = await wixClient.currentCart.removeLineItemsFromCurrentCart([id]);
            return result.cart;
        },
        addToCart: async (id: string, quantity: number, options?: Record<string, string>) => {
            const result = await wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            catalogItemId: id,
                            //this is the static ID of the stores app
                            appId: '1380b703-ce81-ff05-f115-39571d94dfcd',
                            options: { options: options },
                        },
                        quantity: quantity,
                    },
                ],
            });
            const tokens = wixClient.auth.getTokens();
            Cookies.set(WIX_SESSION_TOKEN, JSON.stringify(tokens));

            return result.cart;
        },

        checkout: async () => {
            let checkoutId;
            try {
                const result = await wixClient.currentCart.createCheckoutFromCurrentCart({
                    channelType: currentCart.ChannelType.WEB,
                });
                checkoutId = result.checkoutId;
            } catch (e) {
                return { success: false, url: '' };
            }
            const { redirectSession } = await wixClient.redirects.createRedirectSession({
                ecomCheckout: { checkoutId },
                callbacks: {
                    postFlowUrl: window.location.origin,
                    thankYouPageUrl: `${window.location.origin}${ROUTES.thankYou.to()}`,
                },
            });
            return { success: true, url: redirectSession?.fullUrl };
        },
    };
}

export type WixAPI = ReturnType<typeof getWixApi>;
export type Cart = Awaited<ReturnType<WixAPI['getCart']>>;

export const WixAPIContext = React.createContext<ReturnType<typeof getWixApi>>(
    {} as ReturnType<typeof getWixApi>
);
const MINUTE = 60000;
export const WixAPIContextProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
    const wixClient = useMemo(() => {
        return getWixClient();
    }, []);

    const api = useMemo(() => {
        return getWixApi(wixClient);
    }, [wixClient]);

    return (
        <SWRConfig
            value={{
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: true,
                refreshInterval: 5 * MINUTE,
                keepPreviousData: true,
            }}
        >
            <WixAPIContext.Provider value={api}>{children}</WixAPIContext.Provider>
        </SWRConfig>
    );
};
