import React from 'react';
import classNames from 'classnames';
import styles from './hour-buttons.module.scss'; // Create a corresponding SCSS file for this component
import commonStyles from '@styles/common-styles.module.scss';

interface HourButtonsProps {
    lessonHours: string[];
    selectedHour: string;
    setSelectedHour: (hour: string) => void;
}

export const HourButtons: React.FC<HourButtonsProps> = ({ lessonHours, selectedHour, setSelectedHour }) => {
    return (
        <div className={styles.hourButtonsContainer}>
            {lessonHours.sort().map((lessonHour, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedHour(lessonHour)}
                    className={classNames(
                        commonStyles.primaryButton,
                        {
                            [styles.selectedHour]: selectedHour === lessonHour,
                        },
                    )}
                >
                    {lessonHour}
                </button>
            ))}
        </div>
    );
};
