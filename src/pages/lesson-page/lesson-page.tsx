import commonStyles from '@styles/common-styles.module.scss';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './lesson-page.module.scss';
import { useAvailability, useLessonBySlug } from '../../api/api-hooks';
import { Calendar } from '../../components/calendar/calendar';
import { RouteParams } from '../../router/config';
import { HourButtons } from '../../components/hour-buttons/hour-buttons';

export const LessonPage: React.FC = () => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState<string>('');

    const handledDateSelected = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setSelectedHour('');
        } else {
            setSelectedDate(null);
            setSelectedHour('');
        }
    };

    const typeOfLesson = data?.name!;

    const datesToLessons = useMemo(() => {
        return availability?.availabilityEntries?.reduce((acc, entry) => {
            const currentDay = new Date(entry?.slot?.startDate!);
            const normalizedDay = new Date(currentDay);
            normalizedDay.setHours(0, 0, 0, 0); // Normalize to the start of the day
            const lessonStartingHour = format(currentDay, 'HH:mm:aa');

            if (!acc.has(normalizedDay)) {
                acc.set(normalizedDay, []);
            }
            acc.get(normalizedDay)?.push(lessonStartingHour);
            return acc;
        }, new Map<Date, string[]>());
    }, [availability?.availabilityEntries]);

    const availableDates = datesToLessons ? Array.from(datesToLessons?.keys()) : [];

    if (!datesToLessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <>
            <div className={styles.headerSection}>
                <h1 className={styles.typeOfClass}> {typeOfLesson}</h1>
                <h2>Check out our availability and book the date and time that works for you</h2>
            </div>
            <div className={styles.titlesContainer}>
                <h2 className={styles.secondTitle}>Select a Date and time</h2>
                <h2 className={styles.lessonTitle}>Service Details</h2>
            </div>
            <hr className={styles.seperator} />
            <div className={styles.calendarWithDetails}>
                <div className={styles.schedulingContainer}>
                    <div className={styles.calendarWithDetails}>
                        <Calendar
                            selectedDate={selectedDate}
                            onDateSelected={handledDateSelected}
                            availableDates={availableDates}
                        />
                        <HourButtons
                            availableHours={
                                (selectedDate && datesToLessons?.get(selectedDate)) || []
                            }
                            selectedHour={selectedHour}
                            onHourSelected={setSelectedHour}
                        />
                    </div>
                </div>
                {selectedDate && (
                    <div>
                        <div className={styles.content}>
                            <h2>{typeOfLesson}</h2>
                            <h2>{`${selectedDate?.toDateString()}  ${selectedHour}`}</h2>
                            <h4>{availability?.availabilityEntries[0].slot?.location?.name!}</h4>
                            <h4>{'1 hr'}</h4>
                            <h4>{data?.payment?.fixed?.price?.value!}</h4>
                        </div>

                        <hr className={styles.seperator} />
                        <button className={styles.nextButton}>Next</button>
                    </div>
                )}
            </div>
        </>
    );
};
