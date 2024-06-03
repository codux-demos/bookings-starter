import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isSameDay } from 'date-fns';
import 'react-day-picker/dist/style.css';
import styles from './calendar.module.scss';

interface CalendarComponentProps {
    selectedDate: Date;
    onDateSelected: (date: Date) => void;
    availableDates: Date[];
}

export const Calendar: React.FC<CalendarComponentProps> = ({
    selectedDate,
    onDateSelected,
    availableDates,

}) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure the time is set to midnight for correct comparison

    const modifiers = {
        container: true,
        available: (date: Date) => {
            return (
                !isBefore(date, today) &&
                availableDates.some((availableDate) => isSameDay(date, availableDate))
            );
        },
        selected: (date: Date) => isSameDay(date, selectedDate),
        dayInPast: (date: Date) => isBefore(date, today),
    };

    const modifiersClassNames = {
        available: styles.available,
        selected: styles.selected,
        dayInPast: styles.dayInPast,
    };

    return (
        <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelected}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
        />
    );
};
