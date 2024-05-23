import classNames from 'classnames';
import styles from './calendar.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { DayPicker } from 'react-day-picker';

export interface CalendarProps {
    selectedDate: Date;
    setSelectedDate: (date: Date | null) => void;
}

export const Calendar = () => {
    return (
        <DayPicker />
    )
};
