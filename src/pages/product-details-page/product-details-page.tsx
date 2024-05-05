import classNames from 'classnames';
import styles from './product-details-page.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../router/config';
import commonStyles from '../../styles/common-styles.module.scss';
// import { ProductImages } from './lesson-images/lesson-images';
// import { ProductInfo } from './lesson-info/lesson-info';
import { useAddToCart, useLessonBySlug } from '../../api/api-hooks';
import { useContext, useRef } from 'react';
import { CartOpenContext } from '../../components/cart/cart-open-context';
// import { OptionType } from '@wix/stores/build/cjs/src/stores-catalog-v1-lesson.universal';

export interface ProductDetailsPageProps {
    className?: string;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ className }) => {
    const { setIsOpen } = useContext(CartOpenContext);
    const { slug } = useParams<RouteParams['/lesson/:slug']>();

    const { data: lesson, isLoading } = useLessonBySlug(slug);
    const { trigger: addToCart } = useAddToCart();
    const quantityInput = useRef<HTMLInputElement>(null);

    if (!lesson) {
        return (
            <div className={commonStyles.loading}>
                {isLoading ? 'Loading...' : 'The lesson is not found'}
            </div>
        );
    }

    async function addToCartHandler() {
        // if (!lesson?._id) {
        //     return;
        // }
        // const quantity = parseInt(quantityInput.current?.value || '1', 10);
        // const options: Record<string, string> = {};
        // //we are selecting here the first option for each lesson
        // //most products in the default store do not have options.
        // //but, for those who do, we need to specify the option value when we add to cart.


        // lesson.productOptions?.forEach((option) => {
        //     if (option.name && option.choices?.length && option.choices[0].value) {
        //         options[option.name] =
        //             option.optionType === OptionType.color
        //                 ? option.choices[0].description!
        //                 : option.choices[0].value;
        //     }
        // });
        // await addToCart({ id: lesson._id, quantity, options });
        // setIsOpen(true);
    }

    return (
        <div className={classNames(styles.root, className)}>
            {/* <ProductImages
                mainImage={lesson.media?.mainMedia}
                images={lesson.media?.items}
                className={styles.left}
            />
            <div className={styles.right}>
                <div>{lesson.name}</div>
                {lesson.price && (
                    <div className={commonStyles.price}>{lesson.price?.formatted?.price}</div>
                )}

                <div className={styles.addToCart}>
                    <label>
                        Quantity: <br />
                        <input
                            ref={quantityInput}
                            className={classNames(commonStyles.numberInput, styles.quantity)}
                            type="number"
                            min={1}
                            placeholder="1"
                        />
                    </label>
                    <button
                        onClick={addToCartHandler}
                        className={classNames(commonStyles.primaryButton, styles.addToCartBtn)}
                    >
                        Add to Cart
                    </button>
                </div>
                <ProductInfo
                    className={styles.productInfo}
                    productInfo={lesson.additionalInfoSections}
                />
            </div> */}
        </div>
    );
};
