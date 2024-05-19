import { SingleInput } from '../../../components/single-input/single-input';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'SingleInput Error',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <SingleInput inputTitle="First name" hasError={true} isMandatory={false} />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});