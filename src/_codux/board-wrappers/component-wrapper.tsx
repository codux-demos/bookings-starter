import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import {
    FakeWixAPIContextProvider,
    FakeDataSettings,
} from '../fake-data/fake-wix-api-context-provider';
import { CartOpenContextProvider } from '../../components/cart/cart-open-context';

type Props = {
    children: React.ReactNode;
    /** @important */
    settings?: FakeDataSettings;
};

export function ComponentWrapper(props: Props) {
    const router = createMemoryRouter([
        {
            path: '*',
            element: props.children,
        },
    ]);
    return (
        <FakeWixAPIContextProvider settings={props.settings}>
            <CartOpenContextProvider>
                <RouterProvider router={router} />
            </CartOpenContextProvider>
        </FakeWixAPIContextProvider>
    );
}
