import classNames from 'classnames';
import styles from './calendar.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dstyle.css";


export interface CalendarProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
    return <DayPicker 
    mode="single"
    selected = {selectedDate}
/>;
};
