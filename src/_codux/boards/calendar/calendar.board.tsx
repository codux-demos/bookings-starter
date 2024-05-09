import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import Calendar_board_module from './calendar.board.module.scss';
import { CalendarDateProps } from '/src/components/calendar-date/calendar-date';

const data = {
    month: 'may',
    avalableDates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    availableHours: {
        1: ['10:00', '11:00', '12:00'],
        2: ['10:20', '11:40', '12:00'],
        7: ['13:00', '14:40'],
        8: ['10:00', '11:00', '12:00'],
    },
};

export default createBoard({
    name: 'Calendar',

    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <div className={Calendar_board_module.container}>
                    <Calendar
                        availableDates={data.avalableDates}
                        availableHours={data.availableHours}
                    />
                </div>
            </ContentSlot>
        </ComponentWrapper>
    ),

    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 1, left: 0, top: 0 },
        windowWidth: 546,
        windowHeight: 552,
    },
});
