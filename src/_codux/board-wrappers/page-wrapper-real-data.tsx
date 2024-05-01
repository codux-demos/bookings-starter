import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { WixAPIContextProvider } from '../../api/wix-api-context-provider';
import { getRoutes } from '../../router/routes';
import { replaceRouteWithChildren } from './set-children-to-route';
import { CartOpenContextProvider } from '../../components/cart/cart-open-context';

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
            <CartOpenContextProvider>
                <RouterProvider router={router} />
            </CartOpenContextProvider>
        </WixAPIContextProvider>
    );
}
