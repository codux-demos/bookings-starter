import { generatePath } from 'react-router-dom';

const HOME = '/';
const ABOUT = '/about';
const LESSONS = '/lessons';
const LESSON = `/lesson/:slug`;
const THANK_YOU = '/thank-you';
const MY_BOOKINGS = '/my-bookings';

export const ROUTES = {
    home: { route: HOME, to: () => HOME },
    about: { route: ABOUT, to: () => ABOUT },
    lessons: { route: LESSONS, to: () => LESSONS },
    thankYou: { route: THANK_YOU, to: () => THANK_YOU },
    myBookings: { route: MY_BOOKINGS, to: () => MY_BOOKINGS },
    lesson: {
        route: LESSON,
        to: (lessonSlug: string) => generatePath(LESSON, { slug: lessonSlug }),
    },
};

export type ROUTE_KEYS = keyof typeof ROUTES;
