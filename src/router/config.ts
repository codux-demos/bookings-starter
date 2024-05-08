import { generatePath } from 'react-router-dom';

const HOME = '/';
const ABOUT = '/about';
const PRODUCTS = '/products';
const PRODUCT = `/lesson/:slug`;
const THANK_YOU = '/thank-you';
const MY_BOOKINGS = '/my-bookings';

export const ROUTES = {
    home: { route: HOME, to: () => HOME },
    about: { route: ABOUT, to: () => ABOUT },
    products: { route: PRODUCTS, to: () => PRODUCTS },
    thankYou: { route: THANK_YOU, to: () => THANK_YOU },
    myBookings: { route: MY_BOOKINGS, to: () => MY_BOOKINGS },

    // product: {
    //     route: PRODUCT,
    //     to: (productSlug: string) => generatePath(PRODUCT, { slug: productSlug }),
    // },
};

export type ROUTE_KEYS = keyof typeof ROUTES;

// export type RouteParams = {
//     [PRODUCT]: { slug: string };
// };
