import classNames from 'classnames';
import styles from './time-slot-button.module.scss';
import CommonStyles_module from '../../styles/common-styles.module.scss';

export interface TimeSlotButtonProps {
    time: string;
    available: boolean;
}

export const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({ time, available }) => {
    return <button className={CommonStyles_module.primaryButton}>{time}</button>;
};
