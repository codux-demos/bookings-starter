import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapper } from '/src/_codux/board-wrappers/page-wrapper';
import { useState } from 'react';
import { format } from 'date-fns';

export default createBoard({
    name: 'Calendar',
    Board: () => {
        const today = new Date();
        const formattedToday = format(today, 'dd/MM/yyyy');
        const [selectedDate, setSelectedDate] = useState(today);
        const availableDates = ["29/05/2024", "30/05/2024"]
        return (
            <PageWrapper>
                <ContentSlot>
                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} availableDates = {availableDates} />
                </ContentSlot>
            </PageWrapper>
        );
    },
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0 },
    },
});
