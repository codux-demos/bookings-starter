import classNames from 'classnames';
import styles from './calendar-date.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import CalendarDate_board_module from '../../_codux/boards/calendar-date/calendar-date.board.module.scss';

interface CalendarDateProps {
    isAvailable: boolean;
    isSelected: boolean;
    date: number;
}

export const CalendarDate = ({ isAvailable, isSelected, date }: CalendarDateProps) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.available]: isAvailable,
                [styles.selected]: isSelected,
            })}>
            <div className={styles.date}>{date}</div>
            {isAvailable && (
                <div
                    className={classNames(styles.dot, styles.isAvailable, {
                        [styles.selectedDot]: isSelected,
                    })}
                ></div>
            )}
        </div>
    );
};
