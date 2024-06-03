import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';
import { useState } from 'react';
import { format } from 'date-fns';

export default createBoard({
    name: 'Calendar',
    Board: () => {
        const today = new Date();
        const [selectedDate, onDateSelected] = useState<Date>(today);
        const availableDates = [new Date('2024-06-30'), new Date('2024-05-30')];
        const handleSelectedDate = (date: Date | undefined) => {
            if (date) {
                onDateSelected(date);
            }
        };
        return (
            <Calendar
                selectedDate={selectedDate}
                handleSelectedDate={handleSelectedDate}
                availableDates={availableDates}
            />
        );
    },
});
