import { faker } from '@faker-js/faker';
import { services } from '@wix/bookings';
import { WixAPI } from '../../api/wix-api-context-provider';
import {
    FAKE_IMAGES,
    FAKE_IMAGES_FOLDER,
    FAKE_IMAGES_LISTS,
    FakeImage,
    FakeImagesListKey,
} from './fake-images';

type Lesson = Exclude<Awaited<ReturnType<WixAPI['getLesson']>>, undefined>;
type Media = Exclude<Exclude<Lesson['media'], undefined>['mainMedia'], undefined>;
type LessonAvailability = Exclude<Awaited<ReturnType<WixAPI['getServiceAvailability']>>, undefined>;
type Bookings = Exclude<Awaited<ReturnType<WixAPI['getMyUpcomingBookings']>>, undefined>;

export type FakeDataSettings = {
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
    /** @important */
    numberOfBookings?: number;
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
        mainSlug: {
            name: faker.lorem.slug(),
        },
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
    return {
        image: `${FAKE_IMAGES_FOLDER}${image}`,
    };
}

const createAvailability = (
    id: string,
    lessonAvailabilityEntry?: {
        startDate?: Date;
        endDate?: Date;
        bookingDisabled?: boolean;
    }
): LessonAvailability['availabilityEntries'][number] => {
    const defaultDate = new Date();
    return {
        slot: {
            sessionId: faker.string.uuid(),
            serviceId: id,
            scheduleId: faker.string.uuid(),
            startDate:
                lessonAvailabilityEntry?.startDate?.toISOString() ?? defaultDate.toISOString(),
            endDate:
                lessonAvailabilityEntry?.endDate?.toISOString() ??
                new Date(new Date(defaultDate).setHours(defaultDate.getHours() + 1)).toISOString(),
        },
        bookable: !lessonAvailabilityEntry?.bookingDisabled ?? true,
        isFromV2: false,
        locked: false,
        openSpots: 15,
        totalSpots: 15,
        waitingList: {},
    };
};

export const createLessonAvailability = (
    lessonId: string = faker.string.uuid()
): LessonAvailability => {
    const fakeDates = faker.date.betweens({
        from: new Date(),
        to: faker.date.soon({ days: 7 }),
    });
    const defaultEntries = fakeDates.map((date) => ({
        startDate: date,
        endDate: new Date(new Date(date).setHours(date.getHours() + 1)),
        bookingDisabled: false,
    }));
    return {
        availabilityEntries: defaultEntries.map((entry) => createAvailability(lessonId, entry)),
    };
};
export function createBookingData({ isHistory = false }) {
    const startDate = isHistory
        ? faker.date.past().toISOString()
        : faker.date.future().toISOString();
    const endDate = isHistory ? faker.date.past().toISOString() : faker.date.future().toISOString();

    return {
        booking: {
            _id: faker.string.uuid(),
            bookedEntity: {
                slot: {
                    sessionId: faker.string.uuid(),
                    serviceId: faker.string.uuid(),
                    scheduleId: faker.string.uuid(),
                    startDate,
                    endDate,
                    timezone: 'Europe/Dublin',
                    resource: {
                        id: faker.string.uuid(),
                        name: faker.person.fullName(),
                        email: faker.internet.email(),
                        scheduleId: faker.string.uuid(),
                    },
                    location: {
                        id: faker.string.uuid(),
                        name: 'HOME',
                        locationType: services.LocationType.OWNER_BUSINESS,
                    },
                },
                title: 'Example Service',
                tags: ['INDIVIDUAL'],
            },
            contactDetails: {
                contactId: faker.string.uuid(),
                firstName: faker.person.firstName(),
                email: faker.internet.email(),
                timeZone: 'Europe/Dublin',
                countryCode: 'US',
            },
            additionalFields: [
                {
                    id: faker.string.uuid(),
                    label: 'Example Message',
                    valueType: 'LONG_TEXT',
                    value: faker.lorem.paragraph(),
                },
                {
                    id: faker.string.uuid(),
                    value: 'true',
                    label: 'Example Checkbox',
                    valueType: 'CHECK_BOX',
                },
            ],
            numberOfParticipants: 1,
            status: 'CONFIRMED',
            paymentStatus: services.Status.CONFIRMED,
            selectedPaymentOption: 'ONLINE',
            createdDate: faker.date.past().toISOString(),
            bookingSource: {
                platform: 'WEB',
                actor: 'CUSTOMER',
                appDefId: faker.string.uuid(),
                appName: 'Wix Bookings',
            },
            revision: '3',
            startDate,
            endDate,
            updatedDate: faker.date.recent().toISOString(),
            totalParticipants: 1,
        },
    };
}

export function createUpcomingBookings(settings?: FakeDataSettings): Bookings {
    const result: any = {
        extendedBookings: Array.from(new Array(settings?.numberOfBookings || 10)).map(() =>
            createBookingData({ isHistory: false })
        ),
        pagingMetaData: {
            count: 0,
            hasNext: false,
            cursors: {},
        },
    };
    return result;
}

export function createBookingHistory(settings?: FakeDataSettings): Bookings {
    const result: any = {
        extendedBookings: Array.from(new Array(settings?.numberOfBookings || 10)).map(() =>
            createBookingData({ isHistory: true })
        ),
        pagingMetaData: {
            count: 0,
            hasNext: false,
            cursors: {},
        },
    };
    return result;
}
