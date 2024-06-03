import { ChevronLeftIcon } from '@radix-ui/react-icons';
import commonStyles from '@styles/common-styles.module.scss';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useState } from 'react';
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

    const [selectedDate, onDateSelected] = useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState<string>('');

    const handleSelectedDate = (date: Date | undefined) => {
        if (date) {
            onDateSelected(date);
            setSelectedHour('');
        }
    };

    const typeOfLesson = data?.name!;

    const datesToLessons = availability?.availabilityEntries?.reduce((acc, entry) => {
        const currentDay = new Date(entry?.slot?.startDate!);
        const normalizedDay = format(currentDay, 'yyyy-MM-dd');
        const lessonStartingHour = format(currentDay, 'HH:mm aa');

        if (!acc.has(normalizedDay)) {
            acc.set(normalizedDay, []);
        }
        acc.get(normalizedDay)?.push(lessonStartingHour);

        return acc;
    }, new Map<string, string[]>());

    const availableDates = datesToLessons
        ? Array.from(datesToLessons.keys()).map((dateStr) => new Date(dateStr))
        : [];

    if (!datesToLessons && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

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
                            handleSelectedDate={handleSelectedDate}
                            availableDates={availableDates}
                        />
                        <HourButtons
                            lessonHours={
                                datesToLessons?.get(format(selectedDate, 'yyyy-MM-dd')) || []
                            }
                            selectedHour={selectedHour}
                            setSelectedHour={setSelectedHour}
                        />
                    </div>
                </div>
                <LessonDetails
                    title={typeOfLesson}
                    startDate={`${selectedDate.toDateString()}  ${selectedHour}`}
                    location={availability?.availabilityEntries[0].slot?.location?.name!}
                    duration={'1 hr'}
                    price={data?.payment?.fixed?.price?.value!}
                />
            </div>
        </>
    );
};
