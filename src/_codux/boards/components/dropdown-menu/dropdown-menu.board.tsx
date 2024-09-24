import { ContentSlot, createBoard } from '@wixc3/react-board';
import { DropdownMenu } from '../../../../components/dropdown-menu/dropdown-menu';
import { ComponentWrapper } from '../../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'Dropdown Menu',
    Board: () => (
        <ComponentWrapper>
            <ContentSlot>
                <DropdownMenu
                    username="John Doe"
                    menuItems={[
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
        </ComponentWrapper>
    ),
});
