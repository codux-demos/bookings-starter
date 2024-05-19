import { CustomerDetailsPreview } from '../../../components/customer-details-preview/customer-details-preview';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

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
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
