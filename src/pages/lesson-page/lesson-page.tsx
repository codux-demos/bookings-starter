import classNames from 'classnames';
import styles from './lesson-page.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '/src/router/config';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { useState } from 'react';
import { Calendar } from '/src/components/calendar/calendar';
import { format } from 'date-fns';

interface LessonPageProps{
    selectedDate : Date;
    setSelectedDate: (date: Date) =>void
}


export const LessonPage:React.FC<LessonPageProps> = ({selectedDate, setSelectedDate}) => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const typeOfClass = data?.name;
    console.log(data);
    const availableDates =
        availability?.availabilityEntries.reduce((acc: string[], cur) => {
            if (cur?.slot?.startDate) {
                const date = format(new Date(cur?.slot?.startDate), 'dd/MM/yyyy');
                if (!acc.includes(date)) acc.push(date);
            }
            return acc;
        }, []) || [];

    return (
        <div className={classNames(styles.root)}>
            <button>Back Button</button>
            <div>
                <h1 className={styles.header}> {typeOfClass}</h1>
                <h2>Check out our availability and book the date and time that works for you</h2>
            </div>
            <div className={styles.aboveTheLine}>
                <h2 className={styles.secondTitle}>Select a Date and time</h2>
                <h2>Timezone:</h2>
            </div>

            <hr className={styles.horizontalLine} />

            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                availableDates={availableDates}
            />
        </div>
    );
};
