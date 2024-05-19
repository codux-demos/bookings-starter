import { LessonDetails } from '../../../components/lesson-details/lesson-details';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'LessonDetails',
    Board: () => <ContentSlot ><LessonDetails /></ContentSlot>,
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
