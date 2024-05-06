import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRoutes } from './router/routes';
import { WixAPIContextProvider } from './api/wix-api-context-provider';

const routes = getRoutes();
function App() {
    const router = useMemo(() => createBrowserRouter(routes), []);

    return (
        <WixAPIContextProvider>
            <RouterProvider router={router} />
        </WixAPIContextProvider>
    );
}

export default App;
