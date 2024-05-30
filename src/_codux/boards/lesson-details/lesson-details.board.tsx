import { LessonDetails } from '../../../components/lesson-details/lesson-details';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'LessonDetails',
    Board: () => (
        <ContentSlot>
            <LessonDetails
                title="pump it up"
                startDate="May 6, 2024 at 12:00"
                location="San Fransisco"
                duration="1 hr"
                price="$15"
            />
        </ContentSlot>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
