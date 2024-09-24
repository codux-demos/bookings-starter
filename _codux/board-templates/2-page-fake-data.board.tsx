import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';

export default createBoard({
    name: 'New Board',
    Board: () => (
        //in practice PageWrapper with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapper>
            <ContentSlot />
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
    },
});
