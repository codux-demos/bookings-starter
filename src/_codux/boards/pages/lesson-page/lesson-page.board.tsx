import { LessonPage } from '../../../../pages/lesson-page/lesson-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '/src/_codux/board-wrappers/page-wrapper-real-data';
import { useState } from 'react';

export default createBoard({
    name: 'LessonPage',
    Board: () => {
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board
        const [selectedDate, setSelectedDate] = useState(new Date());

        return (
            <PageWrapperRealData path="/lesson/yin-yoga">
                <ContentSlot>
                    <LessonPage selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </ContentSlot>
            </PageWrapperRealData>
        );
    },
    environmentProps: {
        canvasWidth: 1034,
        canvasHeight: 726,
    },
});
