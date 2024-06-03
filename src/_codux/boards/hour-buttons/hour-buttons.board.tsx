import { HourButtons } from '../../../components/hour-buttons/hour-buttons';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '/src/_codux/board-wrappers/component-wrapper';
import React, { useState } from 'react';

export default createBoard({
    name: 'HourButtons',
    Board: () => {
        const [selectedHour, setSelectedHour] = useState<string>('');
        const lessonHours = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM'];

        return (
            <ComponentWrapper>
                <ContentSlot>
                    <HourButtons
                        lessonHours={lessonHours}
                        selectedHour={selectedHour}
                        setSelectedHour={setSelectedHour}
                    />
                </ContentSlot>
            </ComponentWrapper>
        );
    },
});
