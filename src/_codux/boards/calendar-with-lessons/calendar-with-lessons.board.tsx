import { CalendarWithLessons } from '../../../components/calendar-with-lessons/calendar-with-lessons';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'CalendarWithLessons',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot ><CalendarWithLessons /></ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
