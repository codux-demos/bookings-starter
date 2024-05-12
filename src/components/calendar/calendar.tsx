import { useState } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './datepickerstyles.css';

interface CalendarProps {
    data: { [date: string]: string[] }; // Dates are in 'DD/MM/YYYY' format
}

export const Calendar: React.FC<CalendarProps> = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());

    const isAvailable = (date: Date) => {
        const dateString = format(date, 'dd/MM/yyyy');
        console.log(dateString);
        return dateString in data;
    };

    const getDayClassName = (date: Date) => {
        return classNames('dayStyle', {
            available: isAvailable(date),
            selected: format(date, 'dd/MM/yyyy') === format(selectedDate, 'dd/MM/yyyy'),
        });
    };

    return (
        <DatePicker
            selected={startDate}
            minDate={currentMonthStart}
            maxDate={currentMonthEnd}
            onChange={(date: Date | null) => {
                const newDate = date ? date : new Date();
                setStartDate(newDate);
                setSelectedDate(newDate);
            }}
            inline
            filterDate={(date) => date.getDay() !== 6} 
            dayClassName={getDayClassName}
        />
    );
};
