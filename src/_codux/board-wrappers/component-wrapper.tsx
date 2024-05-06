import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import {
    FakeWixAPIContextProvider,
    FakeDataSettings,
} from '../fake-data/fake-wix-api-context-provider';

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
            <RouterProvider router={router} />
        </FakeWixAPIContextProvider>
    );
}
