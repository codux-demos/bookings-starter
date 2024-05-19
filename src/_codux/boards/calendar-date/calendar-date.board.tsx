import { CalendarDate } from '../../../components/calendar-date/calendar-date';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import styles from './calendar-date.board.module.scss';

export default createBoard({
    name: 'CalendarDate',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <div className={styles.container}>
                    <CalendarDate isAvailable={true} date={9} isSelected={false} />
                    <CalendarDate isAvailable={true} date={9} isSelected={true} />
                    <CalendarDate isAvailable={false} date={9} isSelected={false} />
                    <CalendarDate isAvailable={false} date={9} isSelected={true} />
                </div>
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
