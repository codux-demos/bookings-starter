import { LessonPage } from '../../../pages/lesson-page/lesson-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';

export default createBoard({
    name: 'Fake LessonPage',
    Board: () => (
        //in practice PageWrapper with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapper path="/lesson/yin-y">
            <ContentSlot>
                <LessonPage />
            </ContentSlot>
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
        windowWidth: 1024,
    },
});
