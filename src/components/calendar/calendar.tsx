import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isBefore, isSameDay } from 'date-fns';

import 'react-day-picker/dist/style.css';

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

    const modifiers = {
        available: (date: Date) => {
            const dateString = format(date, 'dd/MM/yyyy');
            return availableDates.includes(dateString) && !isBefore(date, today);
        
        },
        selected: (date: Date) => isSameDay(date, selectedDate),
        dayPassed: (date: Date) => isBefore(date, today),
    };

    return (
        <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={{
                available: { color: 'orange' },
                selected: { backgroundColor: 'orange', color: 'black' },
                dayPassed: { color: 'grey' },
            }}
        />
    );
};
