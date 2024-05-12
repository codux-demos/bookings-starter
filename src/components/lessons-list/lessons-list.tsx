import classNames from 'classnames';
import { useLessons } from '../../api/api-hooks';
import { ROUTES } from '../../router/config';
import commonStyles from '../../styles/common-styles.module.scss';
import { LessonItem } from '../lesson-item/lesson-item';
import styles from './lessons-list.module.scss';

export interface LessonsListProps {
    className?: string;
}

export const LessonsList = ({ className }: LessonsListProps) => {
    const { data: lessons, isLoading } = useLessons();

    if (!lessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            {lessons?.map(
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
    );
};
