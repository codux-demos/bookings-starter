import { format } from 'date-fns';
import { deduceDays } from './constants';
import { Lesson } from './types';

export const processAvailability = (availabilityEntries: any[]): { lessonsByDate: { [key: string]: Lesson[] }, availableDates: string[] } => {
    const lessonsByDate: { [key: string]: Lesson[] } = {};
    const availableDates: string[] = [];

    availabilityEntries.forEach((entry) => {
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

    return { lessonsByDate, availableDates };
};
