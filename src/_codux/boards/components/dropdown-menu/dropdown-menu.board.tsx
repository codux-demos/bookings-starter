import { DropdownMenu } from '../../../../components/dropdown-menu/dropdown-menu';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Dropdown Menu',
    Board: () => (
        <ContentSlot>
            <DropdownMenu
                username="Username"
                dropdownMenuItems={[
                    {
                        title: 'My Account',
                        redirectTo: '',
                    },
                    {
                        title: 'My Bookings',
                        redirectTo: '',
                    },
                    {
                        title: 'My Wallet',
                        redirectTo: '',
                    },
                    {
                        title: 'My Orders',
                        redirectTo: '',
                    },
                    {
                        title: 'My Addresses',
                        redirectTo: '',
                    },
                ]}
            />
        </ContentSlot>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 1024,
    },
});
