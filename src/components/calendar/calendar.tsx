import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { format, isBefore, isSameDay } from 'date-fns';
import { CalendarDate } from '../calendar-date/calendar-date';
import './daypickerstyles.css';

interface CalendarComponentProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    availableDates: string[];
}

export const Calendar: React.FC<CalendarComponentProps> = ({ selectedDate, setSelectedDate, availableDates }) => {
    const today = new Date();

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    const renderDay = (date: Date) => {
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

    return (
        <DayPicker
            selected={selectedDate}
            onDayClick={handleDayClick}
            modifiers={{
                available: (date) => availableDates.includes(format(date, 'dd/MM/yyyy')),
            }}
            modifiersStyles={{
                available: {
                    color: 'black',
                    backgroundColor: 'orange',
                },
            }}
            renderDay={renderDay}
        />
    );
};
