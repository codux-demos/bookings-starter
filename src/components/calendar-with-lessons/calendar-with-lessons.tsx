import classNames from 'classnames';
import styles from './calendar-with-lessons.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface CalendarWithLessonsProps {
    className?: string;
}

export const CalendarWithLessons = ({ className }: CalendarWithLessonsProps) => {
    return <div className={classNames(styles.root, className)}>CalendarWithLessons</div>;
};
