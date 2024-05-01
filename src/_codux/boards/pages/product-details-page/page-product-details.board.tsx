import { ProductDetailsPage } from '../../../../pages/product-details-page/product-details-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '/src/_codux/board-wrappers/page-wrapper-real-data';
import { waitForProductImage } from '/src/_codux/board-wrappers/wait-for-helpers';

export default createBoard({
    name: '3 - Product Details Page',
    Board: () => (
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board
        <PageWrapperRealData path="/product/i-m-a-product-9">
            <ContentSlot>
                <ProductDetailsPage/>
            </ContentSlot>
        </PageWrapperRealData>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
    },
    readyToSnapshot: waitForProductImage,
});
