import { useContext } from 'react';
import useSwr, { useSWRConfig } from 'swr';
import { WixAPIContext } from './wix-api-context-provider';

const getLessonKey = (slug: string) => `lesson/${slug}`;

const useWixApi = () => {
    return useContext(WixAPIContext);
}

export function useLessons() {
    const wixApi = useContext(WixAPIContext);
    const { mutate } = useSWRConfig();

    return useSwr('lessons', wixApi.getAllLessons, {
        //here we add a map of items to the cache so we can read a single item from it later
        onSuccess: (lessons) => {
            lessons.forEach((lesson) => {
                //there has to be a slug
                const key = getLessonKey(lesson.mainSlug?.name!);
                mutate(key, lesson).catch((e) => {
                    console.error('mutate failed', e);
                });
            });
        },
    });
}
export function useLessonBySlug(slug?: string) {
    const wixApi = useWixApi();
    return useSwr(slug ? getLessonKey(slug) : null, () => wixApi.getLesson(slug));
}

export const useAvailability = (serviceId: string) => {
    const wixApi = useWixApi();
    return useSwr(`availability/${serviceId}`, () => wixApi.getServiceAvailability(serviceId));
};

export const usePromotedLessons = () => {
    const wixApi = useWixApi();
    return useSwr('promoted-lessons', wixApi.getPromotedLessons);
};

export const useUpcomingBookings = () => {
    const wixApi = useWixApi();
    return useSwr('my-upcoming-bookings', wixApi.getMyUpcomingBookings);
};

export const useBookingHistory = () => {
    const wixApi = useWixApi();
    return useSwr('booking-history', wixApi.getMyBookingHistory);
};

export const useMyProfile = () => {
    const wixApi = useWixApi();
    return useSwr('my-profile', wixApi.getMyProfile);
};