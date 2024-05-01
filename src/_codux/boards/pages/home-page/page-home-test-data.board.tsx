import { HomePage } from '../../../../pages/home-page/home-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';
import { waitForProductImage } from '/src/_codux/board-wrappers/wait-for-helpers';

export default createBoard({
    name: 'Test Home Page',
    Board: () => (
        //in practice PageWrapper with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapper>
            <ContentSlot>
                <HomePage />
            </ContentSlot>
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
        windowWidth: 1024,
        windowHeight: 768,
    },
    readyToSnapshot: waitForProductImage,
});
