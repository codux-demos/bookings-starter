import { availabilityCalendar, bookings, extendedBookings, services } from '@wix/bookings';
import { members } from '@wix/members';
import {
    GetMyMemberResponse,
    GetMyMemberResponseNonNullableFields,
} from '@wix/members_members/build/cjs/src/members-v1-member-members.universal';
import { redirects } from '@wix/redirects';
import { OAuthStrategy, createClient } from '@wix/sdk';
import React, { FC } from 'react';
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
    let userAuthPromise: Promise<{
        user: (GetMyMemberResponse & GetMyMemberResponseNonNullableFields) | null;
    }> | null = null;

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
                { withBookingAllowedActions: true },
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
                { withBookingAllowedActions: true },
            ),
        cancelBooking: ({ _id, revision }: Pick<extendedBookings.Booking, '_id' | 'revision'>) =>
            wixClient!.bookingsActions.cancelBooking(_id!, {
                revision: revision!,
            }),
        getServiceAvailability: (serviceId: string) => {
            const startDate = new Date().toISOString();
            const endDate = new Date(
                new Date(startDate).setMonth(new Date(startDate).getMonth() + 2),
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
        getMyProfile: async () => await wixClient.members.getCurrentMember({}),
        initiateLogin: async () => {
            const loginRequestData = wixClient.auth.generateOAuthData(
                // Add your redirect URI here after adding to the "Allowed redirect domains in settings"
                "http://localhost:5173",
                window.location.href
            );
            localStorage.setItem('oauthData', JSON.stringify(loginRequestData));
            const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
            window.location.href = authUrl;
        },
        fetchUserAuthData: async () => {
            userAuthPromise = new Promise((res) => {
                const wixTokens = JSON.parse(localStorage.getItem('wixTokens') || 'null');
                if (wixTokens) {
                    wixClient.auth.setTokens(wixTokens);
                    wixApi.getMyProfile().then((profile) => {
                        res({ user: profile });
                    });
                } else {
                    const { code, state, error, errorDescription } = wixClient.auth.parseFromUrl();
                    if (code && state) {
                        const oauthData = JSON.parse(localStorage.getItem('oauthData') || 'null');
                        if (!oauthData) {
                            alert('oauthData not found');
                            return;
                        }
                        wixClient.auth
                            .getMemberTokens(code, state, oauthData)
                            .then((memberTokens) => {
                                wixClient.auth.setTokens(memberTokens);
                                localStorage.setItem('wixTokens', JSON.stringify(memberTokens));
                                wixApi.getMyProfile().then((profile) => {
                                    res({ user: profile });
                                });
                            });
                    } else if (error) {
                        alert(`Error: ${errorDescription}`);
                    } else {
                        return null;
                    }
                }
            });
            return userAuthPromise;
        },

        logout: async () => {
            localStorage.removeItem('wixTokens');
            userAuthPromise = null;
            wixClient.auth.logout(window.location.href);
        },
    };
}

export type WixAPI = ReturnType<typeof getWixApi>;

export const WixAPIContext = React.createContext<ReturnType<typeof getWixApi>>(
    {} as ReturnType<typeof getWixApi>,
);

const wixClient = getWixClient();
const wixApi = getWixApi(wixClient);

const MINUTE = 60000;
export const WixAPIContextProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
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
            <WixAPIContext.Provider value={wixApi}>{children}</WixAPIContext.Provider>
        </SWRConfig>
    );
};
