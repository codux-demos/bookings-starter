import classNames from 'classnames';
import styles from './customer-details-preview.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface CustomerDetailsPreviewProps {
    className?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

export const CustomerDetailsPreview = ({
    className,
    firstName,
    lastName,
    email,
    phoneNumber,
}: CustomerDetailsPreviewProps) => {
    return (
        <div className={classNames(styles.root, className, styles.customerDetailsPreview)}>
            <h3 className={styles.CustomerDetailsTitle}>Customer details</h3>
            {firstName} {lastName}
            <h6>{email}</h6>
            <h6>{phoneNumber}</h6>
        </div>
    );
};
