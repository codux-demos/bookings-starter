import React from 'react';
import classNames from 'classnames';
import * as Separator from '@radix-ui/react-separator';
import styles from './lesson-details.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface LessonDetailsProps {
    className?: string;
    title?: string;
    startDate?: string;
    location?: string;
    duration?: string;
    price?: string;
}

export const LessonDetails = ({

    title,
    startDate,
    location,
    duration,
    price,
}: LessonDetailsProps) => {
    return (
        <div className={classNames(styles.root)}>
            <div className={styles.content}>
                <h2>{title}</h2>
                <h2>{startDate}</h2>
                <h4>{location}</h4>
                <h4>{duration}</h4>
                <h4>{price}</h4>
            </div>

            <hr className={styles.seperator} />
            <button className={styles.nextButton}>Next</button>
        </div>
    );
};
