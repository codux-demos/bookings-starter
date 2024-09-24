export const FAKE_IMAGES_FOLDER = '/src/_codux/fake-data/images/';

export const FAKE_IMAGES = {
    '[502_310]_blue.jpg': true,
    '[502_310]_grey.jpg': true,
    '[502_640]_blue.jpg': true,
    '[502_640]_grey.jpg': true,
    '[100_100]_grey.jpg': true,
};

export type FakeImage = keyof typeof FAKE_IMAGES;

export const FAKE_IMAGES_LISTS = {
    all: ['[502_310]_blue.jpg', '[502_310]_grey.jpg', '[502_640]_blue.jpg', '[502_640]_grey.jpg'],
    grey: ['[502_310]_grey.jpg', '[502_640]_grey.jpg'],
    blue: ['[502_310]_blue.jpg', '[502_640]_blue.jpg'],
} satisfies { [key: string]: FakeImage[] };

export type FakeImagesListKey = keyof typeof FAKE_IMAGES_LISTS;
