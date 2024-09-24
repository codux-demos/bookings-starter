import { Payment } from '../../../components/payment/payment';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'Payment',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <Payment />
            </ContentSlot>
        </ComponentWrapper>
    ),
});
