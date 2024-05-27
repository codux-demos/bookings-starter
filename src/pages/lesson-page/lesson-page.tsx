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

const deduceDays: { [key: number]: string } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};

interface LessonPageProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void
}


export const LessonPage: React.FC<LessonPageProps> = ({ selectedDate, setSelectedDate }) => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);
    console.log(availability)

    const typeOfClass = data?.name;
    const lessonsByDate: { [key: string]: any[] } = {};
    const availableDates =
        availability?.availabilityEntries.reduce((acc: string[], current) => {
            if (current?.slot?.startDate) {
                const date: string = format(new Date(current?.slot?.startDate), 'dd/MM/yyyy');
                if (!lessonsByDate[date]) {
                    lessonsByDate[date] = [];
                }
                lessonsByDate[date].push({
                    day: deduceDays[new Date(current?.slot?.startDate).getDay()],
                    startHour: format(new Date(current?.slot?.startDate), 'HH:mm')
                });
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


            const [selectedDate, setSelectedDate] = useState(new Date());

            if (!availability && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

            return (
            <div className={classNames(styles.root, className)}>
                <button className={classNames(commonStyles.secondaryButton, styles.backButton)}>
                    <ChevronLeftIcon /> Back
                </button>
                <h2 className={styles.lessonTitle}>{data?.name}</h2>
                <h4 className={styles.lessonDescription}>{data?.description}</h4>
                <LessonDetails
                    title={data?.name!}
                    startDate={selectedDate.toDateString()}
                    location={availability?.availabilityEntries[0].slot?.location?.name!}
                    duration={'1 hr'}
                    price={data?.payment?.fixed?.price?.value!}
                />
            </div>
            );
};
