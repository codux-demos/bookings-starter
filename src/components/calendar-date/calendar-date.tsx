import classNames from 'classnames';
import styles from './calendar-date.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import CalendarDate_board_module from '../../_codux/boards/calendar-date/calendar-date.board.module.scss';

export interface CalendarDateProps {
    isAvailable: boolean;
    date: number;
}

export const CalendarDate = ({ isAvailable, date }: CalendarDateProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.date}>{date}</div>
            {isAvailable && (
                <div className={styles.dot}></div>
            )}
        </div>
    );
};
