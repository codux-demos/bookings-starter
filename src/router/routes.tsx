import { RouteObject } from 'react-router-dom';
import { SiteWrapper } from '../components/site-wrapper/site-wrapper';
import { HomePage } from '../pages/home-page/home-page';
import { AboutPage } from '../pages/about-page/about-page';
import { ROUTES } from './config';
import { ProductDetailsPage } from '../pages/product-details-page/product-details-page';
import { ProductsPage } from '../pages/products-page/products-page';
import { ThankYouPage } from '../components/thank-you-page/thank-you-page';

export const getRoutes: () => RouteObject[] = () => [
    {
        path: '/',
        element: <SiteWrapper />,
        children: [
            { path: ROUTES.home.route, index: true, element: <HomePage /> },
            { path: ROUTES.products.route, element: <ProductsPage /> },
            { path: ROUTES.product.route, element: <ProductDetailsPage /> },
            { path: ROUTES.about.route, element: <AboutPage /> },
            { path: ROUTES.thankYou.route, element: <ThankYouPage /> },
        ],
    },
];
