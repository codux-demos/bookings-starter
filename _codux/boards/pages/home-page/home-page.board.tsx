import { HomePage } from '~/pages/home-page/home-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '../../../board-wrappers/page-wrapper-real-data';
import { waitForProductImage } from '../../../board-wrappers/wait-for-helpers';

export default createBoard({
    name: '1 - Home Page',
    Board: () => (
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapperRealData path="/">
            <ContentSlot>
                <HomePage />
            </ContentSlot>
        </PageWrapperRealData>
    ),
    isSnippet: false,
    environmentProps: { windowWidth: 1920, windowHeight: 1080 },
});
