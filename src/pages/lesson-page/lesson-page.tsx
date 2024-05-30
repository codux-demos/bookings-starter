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
import { Lesson } from '/src/utils/types';
import { processAvailability } from '/src/utils/utils';



export const LessonPage: React.FC = () => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState('');

    const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy');

    const typeOfClass = data?.name!;

    const { lessonsByDate, availableDates } = processAvailability(availability?.availabilityEntries || []);

    useEffect(() => {
        if (lessonsByDate[formattedSelectedDate]?.length > 0) {
            setSelectedHour(lessonsByDate[formattedSelectedDate][0].startHour);
        }
    }, [formattedSelectedDate, lessonsByDate]);

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
