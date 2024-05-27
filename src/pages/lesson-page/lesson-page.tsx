import classNames from 'classnames';
import styles from './lesson-page.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '/src/router/config';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { useState } from 'react';
import { Calendar } from '/src/components/calendar/calendar';
import { format } from 'date-fns';

export interface LessonPageProps {
    className?: string;
}

export const LessonPage = ({ className }: LessonPageProps) => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);
    const availableDates =
        availability?.availabilityEntries.reduce((acc: string[], cur) => {
            if (cur?.slot?.startDate) {
                const date = format(new Date(cur?.slot?.startDate), 'dd/MM/yyyy');
                if (!acc.includes(date)) acc.push(date);
            }
            return acc;
        }, []) || [];
    const [selectedDate, setSelectedDate] = useState(new Date());

    if (!availability && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div>
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                availableDates={availableDates}
            />
        </div>
    );
};
