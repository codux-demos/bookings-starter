import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import { Cart } from '/src/components/cart/cart';

export default createBoard({
    name: '5 - Cart Empty',
    Board: () => (
        <ComponentWrapper
            settings={{
                numberOfCartItems: 0,
            }}
        >
            <ContentSlot>
                <Cart initialIsOpen />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: false,
});
