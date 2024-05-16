import { format, startOfDay, isSameMonth } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDate } from '../calendar-date/calendar-date';
import './datepickerstyles.css';

interface CalendarProps {
    data: { [date: string]: string[] }; // Dates are in 'DD/MM/YYYY' format
}

export const Calendar: React.FC<CalendarProps> = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = startOfDay(new Date());

    const renderDayContents = (day: number, date: Date) => {
        const dateString = format(date, 'dd/MM/yyyy');
        const isAvailable = dateString in data && date >= today;
        const isSelected = format(date, 'dd/MM/yyyy') === format(selectedDate, 'dd/MM/yyyy');

        return <CalendarDate isAvailable={isAvailable} date={day} isSelected={isSelected} />;
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
                if (date) setSelectedDate(date);
            }}
            inline
            calendarClassName="calendar"
            renderDayContents={renderDayContents}
            minDate={today}
            filterDate={(date) => date.getDay() !== 6}
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
        />
    );
};
