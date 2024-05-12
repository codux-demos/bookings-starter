import { TimeSlotButton } from '../../../components/time-slot-button/time-slot-button';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'TimeSlotButton',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <TimeSlotButton time ='10:00' available= true/>
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
