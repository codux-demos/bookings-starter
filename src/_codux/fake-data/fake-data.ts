import { faker } from '@faker-js/faker';
import { services } from '@wix/bookings';
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

type Lesson = Exclude<Awaited<ReturnType<WixAPI['getLesson']>>, undefined>;
type Media = Exclude<Exclude<Lesson['media'], undefined>['mainMedia'], undefined>;
type CartTotals = Exclude<Awaited<ReturnType<WixAPI['getCartTotals']>>, undefined>;

export type FakeDataSettings = {
    /** @important */
    numberOfCartItems?: number;
    /** @important */
    numberOfLessons?: number;
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

export function createLessons(
    settings?: FakeDataSettings
): Awaited<ReturnType<WixAPI['getAllLessons']>> {
    return Array.from(new Array(settings?.numberOfLessons || 10)).map((id) =>
        createLesson(id, settings)
    );
}

export function createLesson(id?: string, settings?: FakeDataSettings): Lesson {
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
        tagLine: faker.lorem.word(),
        name: faker.lorem.words(settings?.numberOfWordsInTitle || 2),
        description: faker.commerce.productDescription(),
        media: {
            items: images,
            mainMedia: mainImage,
        },
        payment: {
            fixed: {
                price: {
                    value: price,
                    currency: 'USD',
                },
            },
        },
        type: services.ServiceType.CLASS,
        locations: [
            {
                business: {
                    _id: faker.string.uuid(),
                    name: faker.company.name(),
                },
            },
        ],
        schedule: {
            _id: faker.string.uuid(),
            availabilityConstraints: {
                sessionDurations: [60],
                timeBetweenSessions: 0,
            },
        },
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
        image: `${FAKE_IMAGES_FOLDER}${image}`,
    };
}

export function createCart(lessons: Lesson[]): Cart {
    return {
        _id: faker.string.uuid(),
        currency: '$',
        lineItems: lessons.map(createCartItem),
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

export function createCartItem(lesson: Lesson): Cart['lineItems'][0] {
    return {
        _id: faker.string.uuid(),
        productName: {
            original: lesson.name!,
            translated: lesson.name,
        },
        quantity: faker.number.int({ min: 1, max: 10 }),
        image: lesson.media!.mainMedia!.image!,
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
