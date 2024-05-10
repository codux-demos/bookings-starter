import classNames from 'classnames';
import styles from './payment.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { SingleInput } from '../single-input/single-input';

export interface PaymentProps {
    className?: string;
}

export const Payment = ({ className }: PaymentProps) => {
    return (
        <div className={classNames(styles.root, className, styles.paymentdiv)}>
            <h3 className={styles.title}>Payment</h3>
            <h2 className={styles.boldMessage}>
                We&apos;re not able to accept online payments at the moment.
            </h2>
            <h3>Please contact us to complete your purchase. Thanks. </h3>
            <h2 className={styles.subTitle}>Billing address</h2>
            <SingleInput inputTitle="First name" />
            <SingleInput inputTitle="Last name" />
            <SingleInput inputTitle="Phone" />
            <SingleInput inputTitle="Country/Region" />
            <SingleInput inputTitle="Address" />
            <SingleInput inputTitle="City" />
            <SingleInput inputTitle="State" />
            <SingleInput inputTitle="Zip / Postal code" />
            <h2 className={styles.subTitle}>Review &amp; place order</h2>
            <h3>Review the order details above, and place your order when you’re ready.</h3>
            <button className={styles.btnPayment}>Place Order &amp; Pay</button>
        </div>
    );
};
