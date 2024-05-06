import classNames from 'classnames';
import styles from './products-page.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/config';
import { ProductCard } from '../../components/product-card/product-card';
import { useLessons } from '../../api/api-hooks';
import { getImageHttpUrl } from '../../api/wix-image';
import commonStyles from '../../styles/common-styles.module.scss';

export interface ProductsPageProps {
    className?: string;
}

export const ProductsPage = ({ className }: ProductsPageProps) => {
    const { data: myLessons, isLoading } = useLessons();

    if (!myLessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>All Products</h1>
            <div className={styles.gallery}>
                {myLessons?.map(
                    (item) =>
                        item.mainSlug?.name &&
                        item.name && (
                            <Link to={ROUTES.product.to(item.mainSlug.name)} key={item.mainSlug?.name}>
                                <ProductCard
                                    imageUrl={getImageHttpUrl(
                                        item.media?.mainMedia?.image,
                                        240
                                    )}
                                    name={item.name}
                                    price={undefined}
                                    className={styles.productCard}
                                />
                            </Link>
                        )
                )}
            </div>
        </div>
    );
};
