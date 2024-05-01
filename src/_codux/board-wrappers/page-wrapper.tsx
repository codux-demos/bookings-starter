import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import {
    FakeWixAPIContextProvider,
    FakeDataSettings,
} from '../fake-data/fake-wix-api-context-provider';
import { getRoutes } from '../../router/routes';
import { replaceRouteWithChildren } from './set-children-to-route';
import { CartOpenContextProvider } from '/src/components/cart/cart-open-context';

type Props = {
    children: React.ReactNode;
    /** @important */
    settings?: FakeDataSettings;
    path?: string;
};

export function PageWrapper(props: Props) {
    const routes = getRoutes();
    if (props.children) {
        replaceRouteWithChildren(routes, props.path || '/', props.children);
    }
    const router = createMemoryRouter(routes, { initialEntries: [props.path || '/'] });

    return (
        <FakeWixAPIContextProvider settings={props.settings}>
            <CartOpenContextProvider>
                <RouterProvider router={router} />
            </CartOpenContextProvider>
        </FakeWixAPIContextProvider>
    );
}
