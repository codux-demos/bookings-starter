import { ContentSlot, createBoard } from '@wixc3/react-board';
import { Calendar } from '../../../components/calendar/calendar';
import { PageWrapper } from '../../board-wrappers/page-wrapper';

export default createBoard({
    name: 'Calendar',
    Board: () => (
        <PageWrapper>
            <ContentSlot>
                <Calendar />
            </ContentSlot>
        </PageWrapper>
    ),

    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 2192,
        windowHeight: 1368,
    },
});
