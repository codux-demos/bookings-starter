import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRoutes } from './router/routes';
import { WixAPIContextProvider } from './api/wix-api-context-provider';
import { CartOpenContextProvider } from './components/cart/cart-open-context';

const routes = getRoutes();
function App() {
    const router = useMemo(() => createBrowserRouter(routes), []);

    return (
        <WixAPIContextProvider>
            <CartOpenContextProvider>
                <RouterProvider router={router} />
            </CartOpenContextProvider>
        </WixAPIContextProvider>
    );
}

export default App;
