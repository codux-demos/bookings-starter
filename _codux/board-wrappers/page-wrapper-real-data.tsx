import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { WixAPIContextProvider } from '../../src/api/wix-api-context-provider';
import { getRoutes } from '../../src/router/routes';
import { replaceRouteWithChildren } from './set-children-to-route';
import React from 'react';

type Props = {
    children?: React.ReactNode;
    path?: string;
};

export function PageWrapperRealData({ path, children }: Props) {
    const routes = getRoutes();
    if (children && path) {
        replaceRouteWithChildren(routes, path, children);
    }
    const router = createMemoryRouter(routes, { initialEntries: [path || '/'] });

    return (
        <WixAPIContextProvider>
            <RouterProvider router={router} />
        </WixAPIContextProvider>
    );
}
