import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isSameDay } from 'date-fns';
import { CalendarDate } from '../calendar-date/calendar-date';
import 'react-day-picker/dist/style.css';

interface CustomDayProps {
    date: Date;
    displayMonth: Date;
    selectedDate: Date;
    availableDates: string[];
}


const CustomDay: React.FC<CustomDayProps> = ({ date, displayMonth,selectedDate, availableDates}) => {
    const today = new Date();
    const dateString = format(date, 'dd/MM/yyyy');
    const isDayPassed = isBefore(date, today);
    const isAvailable = availableDates.includes(dateString) && !isDayPassed;
    const isSelected = isSameDay(date, selectedDate);

    return (
        <CalendarDate
            isAvailable={isAvailable}
            date={date.getDate()}
            isSelected={isSelected}
            isDayPassed={isDayPassed}
        />
    );
};



interface CalendarComponentProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    availableDates: string[];
}

export const Calendar: React.FC<CalendarComponentProps> = ({
    selectedDate,
    setSelectedDate,
    availableDates,
}) => {
    return (
        <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            components = { {Day: CustomDay}}

        />
    );
};
