import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';
import { useState } from 'react';
import { format } from 'date-fns';

export default createBoard({
    name: 'Calendar',
    Board: () => {
        const today = new Date();
        const [selectedDate, onDateSlected] = useState<Date>(today);
        const availableDates = [new Date('2024-05-31'), new Date('2024-05-30')];
        return (
            <Calendar
                selectedDate={selectedDate}
                onDateSlected={onDateSlected}
                availableDates={availableDates}
            />
        );
    },
});
