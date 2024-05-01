import { products } from '@wix/stores';
import { faker } from '@faker-js/faker';
import { PaymentOptionType } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.public';
import { Cart, WixAPI } from '../../api/wix-api-context-provider';
import { WeightUnit } from '@wix/ecom/build/cjs/src/ecom-v1-cart-current-cart.universal';
import {
    FAKE_IMAGES,
    FAKE_IMAGES_FOLDER,
    FAKE_IMAGES_LISTS,
    FakeImage,
    FakeImagesListKey,
} from './fake-images';

type Product = Exclude<Awaited<ReturnType<WixAPI['getProduct']>>, undefined>;
type Media = Exclude<Exclude<Product['media'], undefined>['mainMedia'], undefined>;
type CartTotals = Exclude<Awaited<ReturnType<WixAPI['getCartTotals']>>, undefined>;

export type FakeDataSettings = {
    /** @important */
    numberOfCartItems?: number;
    /** @important */
    numberOfProducts?: number;
    /** @important */
    imageToUse?: '' | FakeImage;
    /** @important */
    imagesListToLoop?: '' | FakeImagesListKey;
    /** @important */
    numberOfWordsInTitle?: number;
    /** @important */
    priceMinValue?: number;
    /** @important */
    priceMaxValue?: number;
};

export function createProducts(
    settings?: FakeDataSettings
): Awaited<ReturnType<WixAPI['getAllProducts']>> {
    return Array.from(new Array(settings?.numberOfProducts || 10)).map((id) =>
        createProduct(id, settings)
    );
}

export function createProduct(id?: string, settings?: FakeDataSettings): Product {
    const numOfImages = faker.number.int({ min: 2, max: 4 });
    const images = Array.from(new Array(numOfImages)).map(() => createImage(settings));
    const mainImage = images[faker.number.int({ min: 0, max: numOfImages - 1 })];

    const price = faker.commerce.price({
        symbol: '$',
        min: settings?.priceMinValue,
        max: settings?.priceMaxValue,
    });
    return {
        _id: id ?? faker.string.uuid(),
        slug: faker.lorem.word(),
        name: faker.lorem.words(settings?.numberOfWordsInTitle || 2),
        description: faker.commerce.productDescription(),
        media: {
            items: images,
            mainMedia: mainImage,
        },
        price: {
            formatted: {
                price: price,
                discountedPrice: price,
            },
            currency: 'USD',
            discountedPrice: parseFloat(price),
        },
        productType: products.ProductType.digital,
        additionalInfoSections: [
            { title: 'PRODUCT INFO', description: faker.lorem.paragraph() },
            { title: 'RETURN & REFUND POLICY', description: faker.lorem.paragraph() },
            { title: 'SHIPPING INFO', description: faker.lorem.paragraph() },
        ],
        collectionIds: [],
        customTextFields: [],
        inventoryItemId: '',
        numericId: '',
        productOptions: [],
        ribbons: [],
        variants: [],
    };
}

function createImage(settings?: FakeDataSettings): Media {
    let image = Object.keys(FAKE_IMAGES)[0];
    if (settings?.imageToUse) {
        image = settings.imageToUse;
    } else if (settings?.imagesListToLoop) {
        const length = FAKE_IMAGES_LISTS[settings.imagesListToLoop].length;
        const images = FAKE_IMAGES_LISTS[settings.imagesListToLoop];
        const imgIndex = faker.number.int({ min: 0, max: length - 1 });
        image = images[imgIndex];
    }
    const match = image.match(/\[(\d+)_(\d+)]/);
    const width = match ? parseInt(match[1]) : 640;
    const height = match ? parseInt(match[2]) : 480;

    return {
        _id: faker.string.uuid(),
        image: {
            url: `${FAKE_IMAGES_FOLDER}${image}`,
            width: width,
            height: height,
        },
        title: faker.lorem.word(),
        mediaType: products.MediaItemType.image,
    };
}

export function createCart(products: products.Product[]): Cart {
    return {
        _id: faker.string.uuid(),
        currency: '$',
        lineItems: products.map(createCartItem),
        appliedDiscounts: [],
        conversionCurrency: 'USD',
        weightUnit: WeightUnit.KG,
    };
}

export function getCartTotals(): CartTotals {
    return {
        currency: '$',
        additionalFees: [],
        appliedDiscounts: [],
        calculatedLineItems: [],
        violations: [],
        weightUnit: WeightUnit.KG,
        priceSummary: {
            subtotal: createPrice(),
        },
    };
}

export function createCartItem(product: products.Product): Cart['lineItems'][0] {
    return {
        _id: faker.string.uuid(),
        productName: {
            original: product.name!,
            translated: product.name,
        },
        quantity: faker.number.int({ min: 1, max: 10 }),
        image: product.media!.mainMedia!.image!.url!,
        paymentOption: PaymentOptionType.FULL_PAYMENT_ONLINE,
        price: createPrice(),
        descriptionLines: [],
        url: '',
    };
}

function createPrice() {
    const priceStr = faker.commerce.price({ symbol: '$' });
    const price = parseFloat(priceStr.replace('$', ''));

    return {
        amount: price.toString(),
        convertedAmount: price.toString(),
        formattedConvertedAmount: priceStr,
        formattedAmount: priceStr,
    };
}
