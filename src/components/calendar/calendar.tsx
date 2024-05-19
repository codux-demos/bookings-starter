import { format, startOfDay, parseISO } from 'date-fns';
import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDate } from '../calendar-date/calendar-date';
import './datepickerstyles.css';
import { useParams } from 'react-router-dom';
import { RouteParams } from '/src/router/config';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { WixAPIContext } from '/src/api/wix-api-context-provider';
import { SlotAvailability } from '@wix/redirects/build/cjs/src/headless-v1-redirect-session.universal';

interface Slot {
    sessionId?: string | null;
    serviceId?: string | null;
    scheduleId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
}

interface DataItem {
    slot?: Slot;
    bookable: boolean;
    isFromV2: boolean;
    locked: boolean;
    openSpots: number;
    totalSpots: number;
    waitingList: Record<string, unknown>;
}

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = startOfDay(new Date());
    const api = useContext(WixAPIContext);
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data: lessonData } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(lessonData?._id!);


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
