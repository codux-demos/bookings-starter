import { Cart } from '../../../../components/cart/cart';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: '5 - Cart',
    Board: () => (
        <ComponentWrapper
            settings={{
                imageToUse: '[100_100]_grey.jpg',
                numberOfCartItems: 3,
            }}
        >
            <ContentSlot>
                <Cart initialIsOpen />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
});
