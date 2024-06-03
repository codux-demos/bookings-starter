import React from 'react';
import classNames from 'classnames';
import styles from './hour-buttons.module.scss'; // Create a corresponding SCSS file for this component
import commonStyles from '@styles/common-styles.module.scss';

interface HourButtonsProps {
    availableHours: string[];
    selectedHour: string;
    onHourSelected: (hour: string) => void;
}

export const HourButtons: React.FC<HourButtonsProps> = ({ availableHours, selectedHour, onHourSelected }) => {
    return (
        <div className={styles.hourButtonsContainer}>
            {availableHours.sort().map((time, index) => (
                <button
                    key={index}
                    onClick={() => onHourSelected(time)}
                    className={classNames(
                        commonStyles.primaryButton,
                        {
                            [styles.selectedHour]: selectedHour === time,
                        },
                    )}
                >
                    {time}
                </button>
            ))}
        </div>
    );
};
