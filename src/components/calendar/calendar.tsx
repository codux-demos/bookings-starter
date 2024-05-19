import { format, parseISO, startOfDay } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { CalendarDate } from '../calendar-date/calendar-date';
import './datepickerstyles.css';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { RouteParams } from '/src/router/config';
import { SlotAvailability } from '@wix/redirects/build/cjs/src/headless-v1-redirect-session.universal';

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = startOfDay(new Date());
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data: lessonData } = useLessonBySlug(slug);
    const { data: availability } = useAvailability(lessonData?._id!);


    const calendarDataByDate = availability?.availabilityEntries.reduce<{ [key: string]: SlotAvailability[] }>((accumulator, lesson) => {
        const lessonDate = lesson.slot?.endDate
            ? format(parseISO(lesson.slot.endDate), "dd/MM/yyyy")
            : "Invalid date";
        if (lessonDate in accumulator) {
            accumulator[lessonDate].push(lesson);
        } else {
            accumulator[lessonDate] = [lesson];
        }
        return accumulator;
    }, {});

    const renderDayContents = (day: number, date: Date) => {
        const dateString = format(date, 'dd/MM/yyyy');
        const isAvailable = dateString in (calendarDataByDate || {}) && date >= today;
        const isSelected = format(date, 'dd/MM/yyyy') === format(selectedDate, 'dd/MM/yyyy');
        return <CalendarDate isAvailable={isAvailable} date={day} isSelected={isSelected} />;
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
                if (date) setSelectedDate(date);
            }}
            inline
            calendarClassName="calendar"
            renderDayContents={renderDayContents}
            minDate={today}
            filterDate={(date) => date.getDay() !== 6}
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
        />
    );
};
