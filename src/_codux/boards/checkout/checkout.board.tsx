import { Checkout } from '../../../components/checkout/checkout';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'Checkout',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <Checkout />
            </ContentSlot>
        </ComponentWrapper>
    ),
});
