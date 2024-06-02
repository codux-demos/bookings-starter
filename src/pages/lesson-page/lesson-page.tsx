import { ChevronLeftIcon } from '@radix-ui/react-icons';
import commonStyles from '@styles/common-styles.module.scss';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import styles from './lesson-page.module.scss';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { Calendar } from '/src/components/calendar/calendar';
import { LessonDetails } from '/src/components/lesson-details/lesson-details';
import { RouteParams } from '/src/router/config';
import { deduceDays } from '/src/utils/constants';

export const LessonPage: React.FC = () => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const [selectedDate, onDateSlected] = useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState<string>('');

    const formattedSelectedDate: string = format(selectedDate, 'dd/MM/yyyy');

    const typeOfClass = data?.name!;

    const lessonsByDate: Map<string, string[]> = new Map<string, string[]>();

    const normalizeDate = (date: Date): string => {
        return format(date, 'yyyy-MM-dd');
    };

    const availableDates = availability?.availabilityEntries.reduce(
        (acc, entry) => {
            const currentDay: Date = new Date(entry?.slot?.startDate!);
            const normalizedDay: string = normalizeDate(currentDay);
            const startHour: string = format(currentDay, 'HH:mm');

            if (!acc.availableDates.some(date => normalizeDate(date) === normalizedDay)) {
                acc.availableDates.push(currentDay);
            }

            if (!lessonsByDate.has(normalizedDay)) {
                lessonsByDate.set(normalizedDay, []);
            }
            lessonsByDate.get(normalizedDay)?.push(startHour);
            return acc;
        },
        { availableDates: [] as Date[] },
    );
    console.log(selectedHour)
    return (
        <div className={classNames(styles.root)}>
            <button className={classNames(commonStyles.secondaryButton, styles.backButton)}>
                <ChevronLeftIcon /> Back
            </button>
            <div className={styles.headerSection}>
                <h1 className={styles.typeOfClass}> {typeOfClass}</h1>
                <h2>Check out our availability and book the date and time that works for you</h2>
            </div>
            <div className={styles.calendarWithDetails}>
                <div className={styles.schedulingContainer}>
                    <h2 className={styles.secondTitle}>Select a Date and time</h2>
                    <hr className={styles.seperator} />
                    <div className={styles.calendarWithDetails}>
                        <Calendar
                            selectedDate={selectedDate}
                            onDateSlected={onDateSlected}
                            setSelectedHour = {setSelectedHour}
                            availableDates={availableDates?.availableDates || []}
                        />
                        <div className={styles.hourButtonsContainer}>
                            {lessonsByDate
                                .get(normalizeDate(selectedDate))
                                ?.map((lessonHour: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedHour(lessonHour)}
                                        className={classNames(
                                            CommonStyles_module.primaryButton,
                                            styles.container,
                                            {
                                                [styles.selectedHour]: selectedHour === lessonHour,
                                            },
                                        )}
                                    >
                                        {lessonHour}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
                <LessonDetails
                    title={typeOfClass}
                    startDate={`${selectedDate.toDateString()}  ${selectedHour}`}
                    location={availability?.availabilityEntries[0].slot?.location?.name!}
                    duration={'1 hr'}
                    price={data?.payment?.fixed?.price?.value!}
                />
            </div>
        </div>
    );
};
