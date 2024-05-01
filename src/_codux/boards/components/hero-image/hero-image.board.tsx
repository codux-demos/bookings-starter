import { HeroImage } from '../../../../pages/home-page/hero-image/hero-image';
import { ContentSlot, createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Hero Image',
    Board: () => (
        <ContentSlot>
            <HeroImage
                bottomLabel="Selected Smartphone Brands"
                buttonLabel="Shop"
                title="Up to 30% off"
                topLabel="Holiday Deals"
            />
        </ContentSlot>
    ),
    isSnippet: true,
});
