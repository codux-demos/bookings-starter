import { ReactNode } from 'react';
import { RouteObject, matchRoutes } from 'react-router-dom';

/**
 * sets the children component to the path in the routes.
 * we do this so the board will be tagged with the page component.
 * @param path the path of the page
 * @param children the component we want to render in that path
 */
export function replaceRouteWithChildren(routes: RouteObject[], path: string, children: ReactNode) {
    const matchingRoutes = matchRoutes(routes, path);
    if (!matchingRoutes) {
        routes.push({ path: path, element: children });
    } else {
        const bestMatchingRoute = matchingRoutes[matchingRoutes.length - 1];
        bestMatchingRoute.route.element = children;
    }
}
