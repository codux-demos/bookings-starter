import { Header } from '../../../../components/header/header';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'Header',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <Header />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: {
            top: 1,
            right: 0,
            left: 0,
        },
    },
});
