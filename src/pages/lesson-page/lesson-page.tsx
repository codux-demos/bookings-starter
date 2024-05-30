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
import CommonStyles_module from '../../styles/common-styles.module.scss';

const deduceDays: { [key: number]: string } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};

interface Lesson {
    day: string;
    startHour: string;
}

export const LessonPage: React.FC = () => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState('');

    const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy');

    const typeOfClass = data?.name!;

    const lessonsByDate: { [key: string]: Lesson[] } = {};
    const availableDates: string[] = [];

    availability?.availabilityEntries.forEach((entry) => {
    const curStartDate = entry?.slot?.startDate;
    if (!curStartDate) return;

    const formattedDate = format(new Date(curStartDate), 'dd/MM/yyyy');
    const startHour = format(new Date(curStartDate), 'HH:mm');
    const dayOfWeek = deduceDays[new Date(curStartDate).getDay()];

    // Only add unique dates to availableDates
    if (!lessonsByDate[formattedDate]) {
        lessonsByDate[formattedDate] = [];
        availableDates.push(formattedDate);
    }

    // Add lesson details to the lessonsByDate
    lessonsByDate[formattedDate].push({ day: dayOfWeek, startHour });
});

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
                                <button
                                    key={index}
                                    onClick={() => setSelectedHour(lesson.startHour)}
                                    className={classNames(
                                        CommonStyles_module.primaryButton,
                                        styles.container,
                                    )}
                                >
                                    {lesson.startHour}
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
