import { OAuthStrategy, createClient } from '@wix/sdk';
import { services } from '@wix/bookings';
import { redirects } from '@wix/redirects';
import React, { FC, useMemo } from 'react';
import { SWRConfig } from 'swr';
import { ROUTES } from '../router/config';

export const WIX_SESSION_TOKEN = 'wix_refreshToken';

function getWixClient() {
    return createClient({
        modules: {
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
