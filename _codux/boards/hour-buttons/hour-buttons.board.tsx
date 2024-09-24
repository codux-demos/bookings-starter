import { HourButtons } from '~/components/hour-buttons/hour-buttons';
import { ContentSlot, createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../board-wrappers/component-wrapper';
import React, { useState } from 'react';

export default createBoard({
    name: 'HourButtons',
    Board: () => {
        const [selectedHour, onHourSelected] = useState<string>('');
        const availableHours = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM'];

        return (
            <ContentSlot>
                <HourButtons
                    availableHours={availableHours}
                    selectedHour={selectedHour}
                    onHourSelected={onHourSelected}
                />
            </ContentSlot>
        );
    },
});
