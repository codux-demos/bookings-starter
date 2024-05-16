import { LessonsList } from '../../../components/lessons-list/lessons-list';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'Lessons List',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <LessonsList />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
