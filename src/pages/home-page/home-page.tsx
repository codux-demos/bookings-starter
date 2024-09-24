import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { useNavigate } from 'react-router-dom';
import { LessonsList } from '~/components/lessons-list/lessons-list';

export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    const navigate = useNavigate();

    return (
        <div className={classNames(styles.root, className)}>
            <HeroImage
                topLabel="Best Prices"
                bottomLabel="PULSEFIT STUDIO"
                buttonLabel="Shop Now"
                topLabelClassName={styles['top-label-highlighted']}
                onButtonClick={() => navigate(ROUTES.lessons.to())}
                title="Incredible Prices on All Your Favorite Items"
            />
            <div className={styles.content}>
                <h1 className={styles['hero-title']}>YOU WANT IT? WE GOT IT</h1>
                <p className={styles.HPprgrp}>
                    Use this space to promote the business, its products or its services. Help
                    people become familiar with the business and its offerings, creating a sense of
                    connection and trust. Focus on what makes the business unique and how users can
                    benefit from choosing it.
                </p>
            </div>
            <LessonsList limit={5} />
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
