import classNames from 'classnames';
import styles from './calendar.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface CalendarProps {
    className?: string;
}

export const Calendar = ({ className }: CalendarProps) => {
    return <div className={classNames(styles.root, className)}>Calendar</div>;
};
