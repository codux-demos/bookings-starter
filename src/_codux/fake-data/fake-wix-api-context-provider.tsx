import React, { FC, useMemo, useState } from 'react';
import {
    createLessons,
    createLesson,
    createCart,
    getCartTotals,
    FakeDataSettings as Settings,
} from './fake-data';
import { WixAPI, WixAPIContext } from '../../api/wix-api-context-provider';
import { faker } from '@faker-js/faker';
import { SWRConfig } from 'swr';

export type FakeDataSettings = Settings;

function getWixApi(settings?: Settings): WixAPI {
    faker.seed(123);
    const lessons = createLessons(settings);

    const api: WixAPI = {
        getAllLessons: async () => {
            return Promise.resolve(lessons);
        },
        getLesson: async (id: string | undefined) => {
            faker.seed(123);
            return Promise.resolve(createLesson(id, settings));
        },
        getPromotedLessons: async () => {
            return Promise.resolve(lessons.slice(0, 4));
        },
        getCart: () => {
            faker.seed(123);
            const lessonsInCart =
                settings?.numberOfCartItems === 0
                    ? []
                    : lessons.slice(0, settings?.numberOfCartItems || 2);
            return Promise.resolve(createCart(lessonsInCart));
        },
        getCartTotals: () => {
            faker.seed(123);
            return Promise.resolve(getCartTotals());
        },
        addToCart: (id: string, quantity: number) => {
            alert(`Add item ${id} to cart with quantity ${quantity}`);
            return api.getCart();
        },
        updateCartItemQuantity: (id: string | undefined | null, quantity: number) => {
            alert(`Update item ${id} to quantity ${quantity}`);
            return api.getCart();
        },
        removeItemFromCart: (id: string) => {
            alert(`Remove item ${id}`);
            return api.getCart();
        },
        checkout: () => {
            alert('Checkout');
            return Promise.resolve({ success: true, url: '' });
        },
    };

    return api;
}

export const FakeWixAPIContextProvider: FC<{
    children: React.ReactElement;
    settings?: Settings;
}> = ({ children, settings }) => {
    const [cache, setCache] = useState(new Map());
    const api = useMemo(() => {
        setCache(new Map());
        return getWixApi(settings);
    }, [settings]);

    return (
        <SWRConfig value={{ provider: () => cache }}>
            <WixAPIContext.Provider value={api}>{children}</WixAPIContext.Provider>
        </SWRConfig>
    );
};
