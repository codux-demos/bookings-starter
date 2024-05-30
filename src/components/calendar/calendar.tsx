import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isSameDay } from 'date-fns';
import 'react-day-picker/dist/style.css';
import styles from './calendar.module.scss';

interface CalendarComponentProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    availableDates: Date[];
}

export const Calendar: React.FC<CalendarComponentProps> = ({
    selectedDate,
    setSelectedDate,
    availableDates,
}) => {
    const adjustToLocalTime = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate;
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const localDate = adjustToLocalTime(date);
            setSelectedDate(localDate);
        }
    };

    const today = new Date();

    const modifiers = {
        available: (date: Date) => {
            return (
                !isBefore(date, today) &&
                availableDates.some((availableDate) => isSameDay(date, availableDate))
            );
        },
        selected: (date: Date) => isSameDay(date, selectedDate),
        dayPassed: (date: Date) => isBefore(date, today),
    };

    const modifiersClassNames = {
        available: styles.available,
        selected: styles.selected,
        dayPassed: styles.dayPassed,
    };

    return (
        <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
        />
    );
};
