import classNames from 'classnames';
import styles from './hour-button.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface HourButtonProps {
    hour: string;
}

export const HourButton:React.FC<HourButtonProps> = ({ hour }) => {
    return <button className={commonStyles.primaryButton}> {hour}</button>;
};
