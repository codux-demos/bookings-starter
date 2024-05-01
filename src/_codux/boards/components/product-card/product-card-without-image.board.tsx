import { ProductCard } from '../../../../components/product-card/product-card';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Product Card No Image',
    Board: () => (
        <ContentSlot>
            <ProductCard
                name='Shel 50" Class LED 4K UHD Smart TV'
                price={{ formatted: { price: '$85' } }}
            />
        </ContentSlot>
    ),
    isSnippet: true,
});
