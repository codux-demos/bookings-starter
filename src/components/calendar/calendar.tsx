import classNames from 'classnames';
import styles from './calendar.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { getDate } from 'date-fns';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { CalendarDate } from '../calendar-date/calendar-date';
import './datepickerstyles.css';

interface CalendarDataProps {
    month?: string;
    availableDates: number[];
    availableHours: { [key: number]: string[] };
}

export const Calendar: React.FC<CalendarDataProps> = ({ availableDates }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const weekend = 6;

    const isAvailable = (dayInMonth: number) => availableDates.includes(dayInMonth);

    // const renderDayContents = (day: number, date: Date) => {
    //     const dateNumber = getDate(date);
    //     return <CalendarDate isAvailable={true} date={dateNumber} />;
    // };

    const getDayClassName = (date: Date) => {
        const dayInWeek = date.getDay();
        const dayInMonth = date.getDate();


        return classNames('dayStyle', {
            // weekend: dayInWeek === 6,
            available: isAvailable(dayInMonth),
            selected: dayInMonth === selectedDate.getDate(),
        });
    };



    return (
        <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
                const newDate = date ? date : new Date();
                setStartDate(newDate);
                setSelectedDate(newDate);
            }}
            inline
            filterDate={(date) => date.getDay() != 6}

            // renderDayContents={renderDayContents}
            dayClassName={getDayClassName}
        />
    );
};
