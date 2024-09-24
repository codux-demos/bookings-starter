import { LessonsPage } from '~/pages/lessons-page/lessons-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '../../../board-wrappers/page-wrapper-real-data';

export default createBoard({
    name: '2 - Lessons Page',
    Board: () => (
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapperRealData path="/lessons">
            <ContentSlot>
                <LessonsPage />
            </ContentSlot>
        </PageWrapperRealData>
    ),
    isSnippet: false,
});
