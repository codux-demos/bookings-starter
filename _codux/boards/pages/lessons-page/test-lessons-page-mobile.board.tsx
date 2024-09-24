import { LessonsPage } from '~/pages/lessons-page/lessons-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '../../../board-wrappers/page-wrapper';

export default createBoard({
    name: 'Test Lessons Page Mobile',
    Board: () => (
        //in practice PageWrapper with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapper
            path="/lessons"
            settings={{
                imagesListToLoop: 'all',
            }}
        >
            <ContentSlot>
                <LessonsPage />
            </ContentSlot>
        </PageWrapper>
    ),
    isSnippet: false,
});
