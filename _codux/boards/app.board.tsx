import { createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '../board-wrappers/page-wrapper-real-data';

export default createBoard({
    name: '0 - App',
    Board: () => <PageWrapperRealData />,
    isSnippet: false,
    environmentProps: {
        canvasMargin: {
            left: 0,
            right: 0,
            bottom: 0,
        },
        windowWidth: 1024,
        windowHeight: 852,
    },
});
