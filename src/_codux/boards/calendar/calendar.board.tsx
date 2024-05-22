import { createBoard } from '@wixc3/react-board';
import { Calendar } from '../../../components/calendar/calendar';
import { PageWrapper } from '../../board-wrappers/page-wrapper';
import Calendar_board_module from './calendar.board.module.scss';

export default createBoard({
    name: 'Calendar',
    Board: () => (
        <PageWrapper>
            <div className={Calendar_board_module.container}>
                <Calendar />
            </div>
        </PageWrapper>
    ),
});
