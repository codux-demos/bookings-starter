import classNames from 'classnames';
import styles from './products-page.module.scss';
import { useLessons } from '../../api/api-hooks';
import { ROUTES } from '../../router/config';
import { LessonItem } from '../../components/lesson-item/lesson-item';
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
            {myLessons?.map(
                (item) =>
                    item.mainSlug?.name &&
                    item.name && (
                        <LessonItem
                            key={item.mainSlug.name}
                            title={item.name}
                            price={item.payment!.fixed!.price!.value!}
                            link={ROUTES.product.to(item.mainSlug.name)}
                        />
                    ),
            )}
        </div>
    );
};
