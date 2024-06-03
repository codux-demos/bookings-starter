import { LessonPage } from '../../../../pages/lesson-page/lesson-page';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { PageWrapperRealData } from '/src/_codux/board-wrappers/page-wrapper-real-data';
import { useState } from 'react';

export default createBoard({
    name: '8 - LessonPage',
    Board: () => (
        //in practice PageWrapperRealData with a path will render the correct page, but it is less convenient to use in a board

        <PageWrapperRealData path="/lesson/yin-yoga">
            <ContentSlot>
                <LessonPage />
            </ContentSlot>
        </PageWrapperRealData>
    ),
    environmentProps: {
        canvasWidth: 1162,
        canvasHeight: 792,
        windowWidth: 1014,
        windowHeight: 667,
    },
});
