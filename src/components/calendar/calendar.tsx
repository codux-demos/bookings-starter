import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isSameDay } from 'date-fns';
import 'react-day-picker/dist/style.css';
import styles from './calendar.module.scss';

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
    const today = new Date();
    // Set the time to midnight to ensure only the date part is compared
    today.setHours(0, 0, 0, 0);


    const modifiers = {
        available: (date: Date) => {
            const dateString = format(date, 'dd/MM/yyyy');
            return availableDates.includes(dateString) && !isBefore(date, today);
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
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            classNames={{
                day: styles.container,
            }}
        />
    );
};
