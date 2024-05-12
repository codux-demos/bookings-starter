import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useLessons } from '../../api/api-hooks';
import { ROUTES } from '../../router/config';
import commonStyles from '../../styles/common-styles.module.scss';
import { LessonItem } from '../lesson-item/lesson-item';
import styles from './lessons-list.module.scss';

export interface LessonsListProps {
    limit?: number;
    className?: string;
}

export const LessonsList = ({ limit, className }: LessonsListProps) => {
    const { data: lessons, isLoading } = useLessons();

    if (!lessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            {lessons?.slice(0, limit ?? lessons.length).map(
                (item) =>
                    item.mainSlug?.name &&
                    item.payment?.fixed?.price?.value &&
                    item.name && (
                        <div key={item.mainSlug.name} className={styles.lesson}>
                            <LessonItem
                                title={item.name}
                                price={item.payment.fixed.price.value}
                                link={ROUTES.lesson.to(item.mainSlug.name)}
                            />
                        </div>
                    ),
            )}
            {limit && lessons?.length && lessons?.length > limit && (
                <div className={styles['all-lessons-button-container']}>
                    <Link to={ROUTES.lessons.to()}>
                        <button className={commonStyles.primaryButton}>All Lessons</button>
                    </Link>
                </div>
            )}
        </div>
    );
};
