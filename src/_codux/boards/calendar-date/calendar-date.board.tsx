import { ContentSlot, createBoard } from '@wixc3/react-board';
import { CalendarDate } from '../../../components/calendar-date/calendar-date';
import styles from './calendar-date.board.module.scss';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'CalendarDate',
    Board: () => (
        <ComponentWrapper settings={{}}>
            <ContentSlot>
                <div className={styles.container}>
                    <CalendarDate date={9} isAvailable={true} />
                    <CalendarDate date={9} isAvailable isSelected />
                    <CalendarDate date={9} />
                    <CalendarDate date={9} isSelected={true} />
                    <CalendarDate date={9} isDayPassed/>
                </div>
            </ContentSlot>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
        windowWidth: 1040,
    },
});
