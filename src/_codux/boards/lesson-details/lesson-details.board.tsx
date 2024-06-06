import { LessonDetails } from '../../../components/lesson-details/lesson-details';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'LessonDetails',
    Board: () => (
        <ContentSlot>
            <LessonDetails
                title="pump it up"
                startDate="May 6, 2024"
                location="San Fransisco"
                duration="1 hr"
                price="$15"
            />
        </ContentSlot>
    ),
});
