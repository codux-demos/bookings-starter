import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'New Board',
    Board: () => <ContentSlot />,
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
