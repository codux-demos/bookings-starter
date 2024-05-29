import classNames from 'classnames';
import styles from './hour-button.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import CommonStyles_module from '../../styles/common-styles.module.scss';

export interface HourButtonProps {
    hour: string;
}

export const HourButton: React.FC<HourButtonProps> = ({ hour }) => {
    return (
        <button className={classNames(CommonStyles_module.primaryButton, styles.container)}>
            {hour}
        </button>
    );
};
