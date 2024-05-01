import { createContext, useMemo, useState } from 'react';

export const CartOpenContext = createContext({ isOpen: false, setIsOpen: (isOpen: boolean) => {} });

export function CartOpenContextProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const providerValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

    return <CartOpenContext.Provider value={providerValue}>{children}</CartOpenContext.Provider>;
}
