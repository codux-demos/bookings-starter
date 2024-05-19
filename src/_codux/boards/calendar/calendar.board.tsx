import { Calendar } from '../../../components/calendar/calendar';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import Calendar_board_module from './calendar.board.module.scss';



export default createBoard({
    name: 'Calendar',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <div className={Calendar_board_module.heyyyy}>
                    <Calendar/>
                </div>
            </ContentSlot>
        </ComponentWrapper>
    ),

    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 2192,
        windowHeight: 1368,
    },
});
