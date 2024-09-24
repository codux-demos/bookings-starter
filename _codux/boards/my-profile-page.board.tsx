import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '../board-wrappers/page-wrapper';
import { ProfilePage } from '~/pages/profile-page/profile-page';

export default createBoard({
    name: 'My Profile page',
    Board: () => (
        <PageWrapper>
            <ContentSlot>
                <ProfilePage />
            </ContentSlot>
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
    },
});
