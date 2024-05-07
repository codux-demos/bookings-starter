import { LessonItem } from '../../../components/lesson-item/lesson-item';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'Lesson Item',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <LessonItem price="$15" title="Pump It Up" link="" />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 1024,
        windowHeight: 768,
    },
});
