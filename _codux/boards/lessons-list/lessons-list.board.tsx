import { LessonsList } from '~/components/lessons-list/lessons-list';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'Lessons List',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <LessonsList />
            </ContentSlot>
        </ComponentWrapper>
    ),
});
