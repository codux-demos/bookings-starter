import React, { FC, useMemo, useState } from 'react';
import {
    createLessons,
    createLesson,
    FakeDataSettings as Settings,
    createUpcomingBookings,
    createBookingHistory,
    createLessonAvailability,
    createUserData,
} from './fake-data';
import { WixAPI, WixAPIContext } from '../../api/wix-api-context-provider';
import { faker } from '@faker-js/faker';
import { SWRConfig } from 'swr';

export type FakeDataSettings = Settings;

function getWixApi(settings?: Settings): WixAPI {
    faker.seed(123);
    const lessons = createLessons(settings);

    const api: WixAPI = {
        getAllLessons: async () => {
            return Promise.resolve(lessons);
        },
        getLesson: async (id: string | undefined) => {
            faker.seed(123);
            return Promise.resolve(createLesson(id, settings));
        },
        getPromotedLessons: async () => {
            return Promise.resolve(lessons.slice(0, 4));
        },
        getMyUpcomingBookings: async () => {
            return Promise.resolve(createUpcomingBookings(settings));
        },
        getMyBookingHistory: async () => {
            return Promise.resolve(createBookingHistory(settings));
        },
        cancelBooking: async (booking: any): Promise<any> => {
            alert('Cancel booking');
            return Promise.resolve({ success: true });
        },
        checkout: () => {
            alert('Checkout');
            return Promise.resolve({ success: true, url: '' });
        },
        getMyProfile: async () => {
            return Promise.resolve(createUserData());
        },
        getServiceAvailability: (lessonId: string) => {
            return Promise.resolve(createLessonAvailability(lessonId));
        },
        initiateLogin: async () => {
            alert('Initiate login');
        },
        fetchUserAuthData: async () => {
            return Promise.resolve({ user: { member: { profile: { nickname: 'John Doe' } } } });
        },
        logout: async () => {
            alert('Logout');
        },

    };

    return api;
}

export const FakeWixAPIContextProvider: FC<{
    children: React.ReactElement;
    settings?: Settings;
}> = ({ children, settings }) => {
    const [cache, setCache] = useState(new Map());
    const api = useMemo(() => {
        setCache(new Map());
        return getWixApi(settings);
    }, [settings]);

    return (
        <SWRConfig value={{ provider: () => cache }}>
            <WixAPIContext.Provider value={api}>{children}</WixAPIContext.Provider>
        </SWRConfig>
    );
};
