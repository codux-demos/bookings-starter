import { CustomerDetailsPreview } from '~/components/customer-details-preview/customer-details-preview';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'CustomerDetailsPreview',
    Board: () => (
        <ComponentWrapper >
            <ContentSlot>
                <CustomerDetailsPreview
                    email="erezs@wix.com"
                    firstName="Erez"
                    lastName="Shasha"
                    phoneNumber="017641120148"
                />
            </ContentSlot>
        </ComponentWrapper>
    ),
});
