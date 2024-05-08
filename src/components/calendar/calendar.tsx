import classNames from 'classnames';
import styles from './calendar.module.scss';
import 'react-datepicker/dist/react-datepicker.css'; // ensure the CSS is also imported

import DatePicker from 'react-datepicker';
import { useState } from 'react';

export const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    return <DatePicker onChange={(date: Date | null) => setStartDate(date ? date : new Date())} />;
};
