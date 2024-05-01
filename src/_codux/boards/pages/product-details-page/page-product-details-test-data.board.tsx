import { ProductDetailsPage } from '../../../../pages/product-details-page/product-details-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';
import { waitForProductImage } from '/src/_codux/board-wrappers/wait-for-helpers';

export default createBoard({
    name: 'Test Product Details Page',
    Board: () => (
        //in practice PageWrapper with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapper path="/product/fake">
            <ContentSlot>
                <ProductDetailsPage />
            </ContentSlot>
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
    },
    readyToSnapshot: waitForProductImage,
});
