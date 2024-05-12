import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import Calendar_board_module from './calendar.board.module.scss';
import { CalendarDateProps } from '/src/components/calendar-date/calendar-date';

const data = {
    '01/05/2024': ['10:00', '11:00', '12:00'],
    '02/05/2024': ['10:20', '11:40', '12:00'],
    '07/05/2024': ['13:00', '14:40'],
    '08/05/2024': ['10:00', '11:00', '12:00'],
    'asd': ["11"]
};

export default createBoard({
    name: 'Calendar',

    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <div className={Calendar_board_module.container}>
                    <Calendar data={data} />
                </div>
            </ContentSlot>
        </ComponentWrapper>
    ),

    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 1920,
        windowHeight: 1368,
    },
});
