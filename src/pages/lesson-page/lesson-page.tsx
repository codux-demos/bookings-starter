import classNames from 'classnames';
import commonStyles from '@styles/common-styles.module.scss';
import styles from './lesson-page.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '/src/router/config';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { useState } from 'react';
import { Calendar } from '/src/components/calendar/calendar';
import { format } from 'date-fns';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { LessonDetails } from '/src/components/lesson-details/lesson-details';
import { HourButton } from '/src/components/hour-button/hour-button';

const deduceDays: { [key: number]: string } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};

export const LessonPage: React.FC = () => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy');

    const typeOfClass = data?.name!;
    console.log(availability)
    const lessonsByDate: { [key: string]: any[] } = {};
    const availableDates =
        availability?.availabilityEntries.reduce((acc: string[], current) => {
            const curStartDate = current?.slot?.startDate;
            if (curStartDate) {
                const date: string = format(new Date(curStartDate), 'dd/MM/yyyy');
                if (!acc.includes(date)) {
                    acc.push(date);
                }
                if (!lessonsByDate[date]) {
                    lessonsByDate[date] = [];
                }
                lessonsByDate[date].push({
                    day: deduceDays[new Date(curStartDate).getDay()],
                    startHour: format(new Date(curStartDate), 'HH:mm'),
                });
            }
            return acc;
        }, []);

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
                            setSelectedDate={setSelectedDate}
                            availableDates={availableDates}
                        />
                        <div className={styles.hourButtonsContainer}>
                            {lessonsByDate[formattedSelectedDate]?.map((lesson, index) => (
                                <HourButton key={index} hour={lesson.startHour} />
                            ))}
                        </div>
                    </div>
                </div>
                <LessonDetails
                    title={typeOfClass}
                    startDate={selectedDate.toDateString()}
                    location={availability?.availabilityEntries[0].slot?.location?.name!}
                    duration={'1 hr'}
                    price={data?.payment?.fixed?.price?.value!}
                />
            </div>
        </div>
    );
};