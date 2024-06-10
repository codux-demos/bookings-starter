import { OAuthStrategy, createClient } from '@wix/sdk';
import { members } from '@wix/members';
import { availabilityCalendar, bookings, extendedBookings, services } from '@wix/bookings';
import { redirects } from '@wix/redirects';
import React, { FC, useMemo } from 'react';
import { SWRConfig } from 'swr';




export const WIX_SESSION_TOKEN = 'wix_refreshToken';

function getWixClient() {
    return createClient({
        modules: {
            availabilityCalendar,
            bookings: extendedBookings,
            bookingsActions: bookings,
            members,
            redirects,
            services,
        },
        auth: OAuthStrategy({
            clientId: import.meta.env.VITE_WIX_CLIENT_ID || process.env.VITE_WIX_CLIENT_ID || '',
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
        getLesson: async (slug?: string) => {
            if (!slug) return;
            return (
                await wixClient!.services
                    .queryServices()
                    .eq('mainSlug.name', decodeURIComponent(slug))
                    .limit(1)
                    .find()
            ).items[0];
        },
        getMyUpcomingBookings: async () =>
            await wixClient!.bookings.queryExtendedBookings(
                {
                    filter: { startDate: { $gte: new Date().toISOString() } },
                    sort: [
                        {
                            fieldName: 'startDate',
                            order: extendedBookings.SortOrder.ASC,
                        },
                    ],
                    cursorPaging: { limit: 20 },
                },
                { withBookingAllowedActions: true }
            ),
        getMyBookingHistory: async () =>
            await wixClient!.bookings.queryExtendedBookings(
                {
                    filter: { startDate: { $lt: new Date().toISOString() } },
                    sort: [
                        {
                            fieldName: 'startDate',
                            order: extendedBookings.SortOrder.DESC,
                        },
                    ],
                    cursorPaging: { limit: 20 },
                },
                { withBookingAllowedActions: true }
            ),
        cancelBooking: ({ _id, revision }: Pick<extendedBookings.Booking, '_id' | 'revision'>) =>
            wixClient!.bookingsActions.cancelBooking(_id!, {
                revision: revision!,
            }),
        getServiceAvailability: (serviceId: string) => {
            const startDate = new Date().toISOString();
            const endDate = new Date(
                new Date(startDate).setMonth(new Date(startDate).getMonth() + 2)
            ).toISOString();
            return wixClient.availabilityCalendar.queryAvailability({
                filter: {
                    serviceId,
                    startDate,
                    endDate,
                },
            });
        },
        checkout: async () => {
            let checkoutId;
            // try {
            //     const result = await wixClient.currentCart.createCheckoutFromCurrentCart({
            //         channelType: currentCart.ChannelType.WEB,
            //     });
            //     checkoutId = result.checkoutId;
            // } catch (e) {
            //     return { success: false, url: '' };
            // }
            // const { redirectSession } = await wixClient.redirects.createRedirectSession({
            //     ecomCheckout: { checkoutId },
            //     callbacks: {
            //         postFlowUrl: window.location.origin,
            //         thankYouPageUrl: `${window.location.origin}${ROUTES.thankYou.to()}`,
            //     },
            // });
            // return { success: true, url: redirectSession?.fullUrl };
            return { success: true, url: '' };
        },
        getMyProfile: async () => await wixClient.members.getCurrentMember(),
        initiateLogin: async () => {
            const loginRequestData = wixClient.auth.generateOAuthData(
                "http://localhost:5173",
            )
            localStorage.setItem('outhData', JSON.stringify(loginRequestData));
            const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
            window.location.href = authUrl;

        },
        handleLoginCallback: async () => {
            const oauthData = JSON.parse(localStorage.getItem('oauthData') || '{}');
            const returnedOAuthData = wixClient.auth.parseFromUrl();
            if (returnedOAuthData.error) {
                alert(`Error: ${returnedOAuthData.errorDescription}`);
                return;
            }
            const memberTokens = await wixClient.auth.getMemberTokens(
                returnedOAuthData.code,
                returnedOAuthData.state,
                oauthData,
            );
            wixClient.auth.setTokens(memberTokens);

        },

        logout: async () => {
            const { logoutUrl } = await wixClient.auth.logout(window.location.href);
            window.location.href = logoutUrl;
        },
    };
}

export type WixAPI = ReturnType<typeof getWixApi>;

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
