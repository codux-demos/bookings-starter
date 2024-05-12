import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { useNavigate } from 'react-router-dom';

export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    const navigate = useNavigate();

    return (
        <div className={classNames(styles.root, className)}>
            <HeroImage
                title="Incredible Prices on All Your Favorite Items"
                topLabel="Best Prices"
                bottomLabel="Get more for less on selected brands"
                buttonLabel="Shop Now"
                topLabelClassName={styles['top-label-highlighted']}
                onButtonClick={() => navigate(ROUTES.lessons.to())}
            />
            <h1 className={styles['hero-title']}>Best Sellers</h1>
            <p className={styles.HPprgrp}>Shop our best seller items</p>
            {/* <div className={styles.cardsLayout}>
                {lessons?.map((lesson) =>
                    lesson.slug && lesson.name ? (
                        <Link to={ROUTES.lesson.to(lesson.slug)} key={lesson.slug}>
                            <ProductCard
                                imageUrl={lesson.media?.items?.at(0)?.image?.url}
                                name={lesson.name}
                                price={lesson.price ?? undefined}
                                className={styles.productCard}
                            />
                        </Link>
                    ) : null
                )}
            </div> */}
        </div>
    );
};
