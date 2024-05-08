import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'Calendar',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <Calendar />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 726,
        windowHeight: 768,
    },
});
