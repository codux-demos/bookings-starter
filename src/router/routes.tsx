import { RouteObject } from 'react-router-dom';
import { SiteWrapper } from '../components/site-wrapper/site-wrapper';
import { HomePage } from '../pages/home-page/home-page';
import { AboutPage } from '../pages/about-page/about-page';
import { ROUTES } from './config';
import { LessonsPage } from '../pages/lessons-page/lessons-page';
import { ThankYouPage } from '../components/thank-you-page/thank-you-page';
import { MyBookingsPage } from '../pages/my-bookings-page/my-bookings-page';

export const getRoutes: () => RouteObject[] = () => [
    {
        path: '/',
        element: <SiteWrapper />,
        children: [
            { path: ROUTES.home.route, index: true, element: <HomePage /> },
            { path: ROUTES.lessons.route, element: <LessonsPage /> },
            { path: ROUTES.about.route, element: <AboutPage /> },
            { path: ROUTES.thankYou.route, element: <ThankYouPage /> },
            { path: ROUTES.myBookings.route, element: <MyBookingsPage /> },
        ],
    },
];
