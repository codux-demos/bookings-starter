import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';
import { useState } from 'react';
import { format } from 'date-fns';

export default createBoard({
    name: 'Calendar',
    Board: () => {
        const today = new Date();
        const [selectedDate, setSelectedDate] = useState(today);
        const availableDates = ['29/05/2024', '30/05/2024'];
        return (
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                availableDates={availableDates}
            />
        );
    },
});
