import classNames from 'classnames';
import styles from './product-card.module.scss';
import { services } from '@wix/bookings';
import noImage from '../../assets/img/noImage/[160_200]_noImage.svg';

export type GalleryCardProps = {
    name: string;
    imageUrl?: string;
    className?: string;
    price?: services.Price;
} & React.HTMLAttributes<HTMLDivElement>;

export const ProductCard = ({
    name,
    imageUrl,
    className,
    price,
    ...divProps
}: GalleryCardProps) => {
    return (
        <div className={classNames(styles.root, className)} {...divProps}>
            {imageUrl ? (
                <img src={imageUrl} alt={name} className={styles.image} data-testid="product-img" />
            ) : (
                <img src={noImage} alt={name} className={styles.image} data-testid="product-img" />
            )}
            <div className={styles.cardContent}>
                <p className={styles.description}>{name}</p>
                {/* price */}
            </div>
        </div>
    );
};
