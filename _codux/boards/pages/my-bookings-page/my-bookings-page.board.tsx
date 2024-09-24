import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '../../../board-wrappers/page-wrapper';
import { MyBookingsPage } from '~/pages/my-bookings-page/my-bookings-page';

export default createBoard({
    name: '7 - My Bookings',
    Board: () => (
        <PageWrapper path="/my-bookings">
            <ContentSlot>
                <MyBookingsPage />
            </ContentSlot>
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 }
    },
});
