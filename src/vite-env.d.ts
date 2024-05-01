/// <reference types="vite/client" />

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.ComponentProps<'svg'> & { title?: string }
    >;
    export default ReactComponent;
}

interface ImportMetaEnv {
    readonly VITE_WIX_CLIENT_ID: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
