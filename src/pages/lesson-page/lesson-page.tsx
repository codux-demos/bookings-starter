import commonStyles from '@styles/common-styles.module.scss';
import { format, isSameDay, setHours, toDate } from 'date-fns';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './lesson-page.module.scss';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { Calendar } from '/src/components/calendar/calendar';
import { LessonDetails } from '/src/components/lesson-details/lesson-details';
import { RouteParams } from '/src/router/config';
import { HourButtons } from '/src/components/hour-buttons/hour-buttons';

export const LessonPage: React.FC = () => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState<string>('');

    const handledDateSelected = (date: Date | null) => {
        if (date) {
            if (selectedDate && isSameDay(date, selectedDate)) setSelectedDate(null);
            else {
                setSelectedDate(date);
                setSelectedHour('');
            }
        } else {
            setSelectedDate(null);
            setSelectedHour('');
        }
    };

    const typeOfLesson = data?.name!;

    const datesToLessons = useMemo(() => {
        return availability?.availabilityEntries?.reduce((acc, entry) => {
            const currentDay = new Date(entry?.slot?.startDate!);
            const lessonStartingHour = format(currentDay, 'HH:mm:aa');
            console.log(currentDay)

            if (!acc.has(currentDay)) {
                acc.set(currentDay, []);
            }
            acc.get(currentDay)?.push(lessonStartingHour);
            return acc;
        }, new Map<Date, string[]>());
    }, [availability?.availabilityEntries]);

    const availableDates = datesToLessons ? Array.from(datesToLessons?.keys()) : [];

    if (!datesToLessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    datesToLessons ? datesToLessons.set(new Date, ["15:30"]) : null;

    return (
        <>
            <div className={styles.headerSection}>
                <h1 className={styles.typeOfClass}> {typeOfLesson}</h1>
                <h2>Check out our availability and book the date and time that works for you</h2>
            </div>
            <div className={styles.calendarWithDetails}>
                <div className={styles.schedulingContainer}>
                    <h2 className={styles.secondTitle}>Select a Date and time</h2>
                    <hr className={styles.seperator} />
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
                    <LessonDetails
                        title={typeOfLesson}
                        startDate={`${selectedDate.toDateString()}  ${selectedHour}`}
                        location={availability?.availabilityEntries[0].slot?.location?.name!}
                        duration={'1 hr'}
                        price={data?.payment?.fixed?.price?.value!}
                    />
                )}
            </div>
        </>
    );
};
