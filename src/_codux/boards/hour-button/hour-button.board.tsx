import { HourButton } from '../../../components/hour-button/hour-button';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'HourButton',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <HourButton hour={'10:00'} />
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
