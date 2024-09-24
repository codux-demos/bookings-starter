import { Header } from '~/components/header/header';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'Header',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <Header />
            </ContentSlot>
        </ComponentWrapper>
    ),
});
