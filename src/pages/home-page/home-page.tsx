import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/product-card/product-card';
import { usePromotedProducts } from '../../api/api-hooks';

export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    const navigate = useNavigate();

    const { data: products } = usePromotedProducts();

    return (
        <div className={classNames(styles.root, className)}>
            <HeroImage
                title="Incredible Prices on All Your Favorite Items"
                topLabel="Best Prices"
                bottomLabel="Get more for less on selected brands"
                buttonLabel="Shop Now"
                topLabelClassName={styles['top-label-highlighted']}
                onButtonClick={() => navigate(ROUTES.products.to())}
            />
            <h1 className={styles['hero-title']}>Best Sellers</h1>
            <p className={styles.HPprgrp}>Shop our best seller items</p>
            <div className={styles.cardsLayout}>
                {products?.map((product) =>
                    product.slug && product.name ? (
                        <Link to={ROUTES.product.to(product.slug)} key={product.slug}>
                            <ProductCard
                                imageUrl={product.media?.items?.at(0)?.image?.url}
                                name={product.name}
                                price={product.price ?? undefined}
                                className={styles.productCard}
                            />
                        </Link>
                    ) : null
                )}
            </div>
        </div>
    );
};
