import classNames from 'classnames';
import styles from './lessons-page.module.scss';
import { useLessons } from '../../api/api-hooks';
import { ROUTES } from '../../router/config';
import { LessonItem } from '../../components/lesson-item/lesson-item';
import commonStyles from '../../styles/common-styles.module.scss';

export interface LessonsPageProps {
    className?: string;
}

export const LessonsPage = ({ className }: LessonsPageProps) => {
    const { data: myLessons, isLoading } = useLessons();

    if (!myLessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>All Lessons</h1>
            <div className={styles.lessons}>
                {myLessons?.map(
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
            </div>
        </div>
    );
};
