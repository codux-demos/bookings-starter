import { useContext, useEffect } from 'react';
import useSwr, { Key, useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { WixAPIContext } from './wix-api-context-provider';
import { findItemIdInCart } from './cart-helpers';

const getLessonKey = (slug: string) => `lesson/${slug}`;

export function useLessons() {
    const wixApi = useContext(WixAPIContext);
    const { mutate } = useSWRConfig();

    return useSwr('lessons', wixApi.getAllLessons, {
        //here we add a map of items to the cache so we can read a single item from it later
        onSuccess: (lessons) => {
            lessons.forEach((lesson) => {
                //there has to be a slug
                const key = getLessonKey(lesson.mainSlug?.name!);
                mutate(key, lesson).catch((e) => {
                    console.error('mutate failed', e);
                });
            });
        },
    });
}
export function useLessonBySlug(slug?: string) {
    const wixApi = useContext(WixAPIContext);
    return useSwr(slug ? getLessonKey(slug) : null, () => wixApi.getLessonBySlug(slug));
}

export const usePromotedLessons = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('promoted-lessons', wixApi.getPromotedLessons);
};

export const useUpcomingBookings = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('my-upcoming-bookings', wixApi.getMyUpcomingBookings);
};

export const useBookingHistory = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('booking-history', wixApi.getMyBookingHistory);
};

export const useCart = () => {
    const wixApi = useContext(WixAPIContext);
    return useSwr('cart', wixApi.getCart);
};

export const useCartTotals = () => {
    const wixApi = useContext(WixAPIContext);
    const { data } = useCart();

    const cartTotals = useSwr('cart-totals', wixApi.getCartTotals);

    useEffect(() => {
        cartTotals.mutate();
    }, [data]);

    return cartTotals;
};

type Args = { id: string; quantity: number };

export const useAddToCart = () => {
    const wixApi = useContext(WixAPIContext);
    const { data: cart } = useCart();
    return useSWRMutation(
        'cart',
        (_key: Key, { arg }: { arg: Args & { options?: Record<string, string> } }) => {
            if (!cart) {
                return wixApi.addToCart(arg.id, arg.quantity, arg.options);
            }
            const itemInCart = findItemIdInCart(cart, arg.id, arg.options);
            return itemInCart
                ? wixApi.updateCartItemQuantity(
                    itemInCart._id,
                    (itemInCart.quantity || 0) + arg.quantity
                )
                : wixApi.addToCart(arg.id, arg.quantity, arg.options);
        },
        {
            revalidate: false,
            populateCache: true,
        }
    );
};

export const useUpdateCartItemQuantity = () => {
    const wixApi = useContext(WixAPIContext);
    return useSWRMutation(
        'cart',
        (_key: Key, { arg }: { arg: Args }) => wixApi.updateCartItemQuantity(arg.id, arg.quantity),
        {
            revalidate: false,
            populateCache: true,
        }
    );
};

export const useRemoveItemFromCart = () => {
    const wixApi = useContext(WixAPIContext);
    return useSWRMutation(
        'cart',
        (_key: Key, { arg }: { arg: string }) => wixApi.removeItemFromCart(arg),
        {
            revalidate: false,
            populateCache: true,
        }
    );
};
