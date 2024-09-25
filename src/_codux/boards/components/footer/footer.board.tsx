import { Footer } from '../../../../components/site-footer/site-footer';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Footer',
    Board: () => (
        <ContentSlot>
            <Footer />
        </ContentSlot>
    )
});
