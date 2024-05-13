import classNames from 'classnames';
import styles from './checkout.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { SingleInput } from '../single-input/single-input';

export interface CheckoutProps {
    className?: string;
}

export const Checkout = ({ className }: CheckoutProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <h6 className={styles.title}>Customer details </h6>
            <SingleInput inputTitle="Email" />
            <SingleInput inputTitle="First name" isMandatory />
            <SingleInput inputTitle="Last name" isMandatory hasError={false} />
            <SingleInput inputTitle="Email" isMandatory={true} />
            <SingleInput inputTitle="Phone number" />
            <SingleInput inputTitle="Add your message" />
            <button className={styles.button}>Continue</button>
        </div>
    );
};
