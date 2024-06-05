import { LessonPage } from '../../../../pages/lesson-page/lesson-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '/src/_codux/board-wrappers/page-wrapper-real-data';

export default createBoard({
    name: '8 - LessonPage',
    Board: () => (
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board

        <PageWrapperRealData path="/lesson/yin-yoga">
            <ContentSlot>
                <LessonPage />
            </ContentSlot>
        </PageWrapperRealData>
    ),
    environmentProps: {
        canvasWidth: 1271.3333333333333,
        windowWidth: 1159,
        windowHeight: 816,
    },
});
