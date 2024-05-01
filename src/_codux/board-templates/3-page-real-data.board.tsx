import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '/src/_codux/board-wrappers/page-wrapper-real-data';

export default createBoard({
    name: 'New Board',
    Board: () => (
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapperRealData>
            <ContentSlot />
        </PageWrapperRealData>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
    },
});
