import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { useNavigate } from 'react-router-dom';
import { usePromotedLessons } from '../../api/api-hooks';
import { LessonsPage } from '../lessons-page/lessons-page';

export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    const navigate = useNavigate();

    const { data: lessons } = usePromotedLessons();

    return (
        <div className={classNames(styles.root, className)}>
            <HeroImage
                title="PULSEFIT STUDIO"
                topLabel="Best Prices"
                buttonLabel="Shop Now"
                topLabelClassName={styles['top-label-highlighted']}
                onButtonClick={() => navigate(ROUTES.lessons.to())}
            />
            <h1 className={styles['hero-title']}>YOU WANT IT? WE GOT IT</h1>
            <p className={styles.HPprgrp}>
                Use this space to promote the business, its products or its services. Help people
                become familiar with the business and its offerings, creating a sense of connection
                and trust. Focus on what makes the business unique and how users can benefit from
                choosing it.{' '}
            </p>
            <LessonsPage />
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
