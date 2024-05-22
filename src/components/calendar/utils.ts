import { format, parseISO } from 'date-fns';
import { SlotAvailability } from '@wix/redirects/build/cjs/src/headless-v1-redirect-session.universal';

export const groupLessonsByDate = (entries: SlotAvailability[]): { [key: string]: SlotAvailability[] } => {
    return entries.reduce<{ [key: string]: SlotAvailability[] }>((accumulator, lesson) => {
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
};