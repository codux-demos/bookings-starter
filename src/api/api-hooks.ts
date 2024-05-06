import { useContext } from 'react';
import useSwr, { useSWRConfig } from 'swr';
import { WixAPIContext } from './wix-api-context-provider';

const getLessonKey = (slug: string) => `lesson/${slug}`;

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
    const wixApi = useContext(WixAPIContext);
    return useSwr(slug ? getLessonKey(slug) : null, () => wixApi.getLesson(slug));
}

export const usePromotedLessons = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('promoted-lessons', wixApi.getPromotedLessons);
};

export const useUpcomingBookings = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('my-upcoming-bookings', wixApi.getMyUpcomingBookings);
};

export const useBookingHistory = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('booking-history', wixApi.getMyBookingHistory);
};