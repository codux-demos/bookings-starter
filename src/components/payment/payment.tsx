import classNames from 'classnames';
import styles from './payment.module.scss';
import commonStyles from '../../styles/common-styles.module.scss';

export interface PaymentProps {
    className?: string;
}

export const Payment = ({ className }: PaymentProps) => {
    return (
        <div className={classNames(styles.root, className, styles.paymentdiv)}>
            <div className={styles['title-wrapper']}>
                <h3 className={styles.title}>Payment</h3>
                <span className={styles.boldMessage}>
                    We&apos;re not able to accept online payments at the moment.
                </span>
                <span>Please contact us to complete your purchase. Thanks. </span>
                <span className={styles.subTitle}>Billing address</span>
            </div>
            <form>
                <label className={commonStyles['input-label']} htmlFor="first-name">
                    First name
                    <input
                        id="first-name"
                        type="text"
                        aria-required
                        required
                        name="name"
                        maxLength={100}
                    />
                </label>
                <label className={commonStyles['input-label']} htmlFor="last-name">
                    Last name
                    <input id="last-name" type="text" name="lastName" maxLength={150} />
                </label>
                <label className={commonStyles['input-label']} htmlFor="phone">
                    Phone
                    <input id="phone" type="phone" name="phone" maxLength={100} />
                </label>
                <label className={commonStyles['input-label']} htmlFor="country">
                    Country/Region
                    <input id="country" type="text" name="country" maxLength={150} />
                </label>
                <label className={commonStyles['input-label']} htmlFor="address">
                    Address
                    <input id="address" type="text" name="address" maxLength={150} />
                </label>
                <label className={commonStyles['input-label']} htmlFor="city">
                    City
                    <input id="city" type="text" name="city" maxLength={150} />
                </label>
                <label className={commonStyles['input-label']} htmlFor="state">
                    State
                    <input id="state" type="text" name="state" maxLength={150} />
                </label>
                <label className={commonStyles['input-label']} htmlFor="zip">
                    Zip / Postal code
                    <input id="zip" type="text" name="zip" maxLength={150} />
                </label>
                <div className={styles['info-wrapper']}>
                    <span className={styles.subTitle}>Review &amp; place order</span>
                    <span>
                        Review the order details above, and place your order when you’re ready.
                    </span>
                </div>
                <button
                    type="submit"
                    className={classNames(commonStyles.primaryButton, styles['submit-button'])}
                >
                    Place Order &amp; Pay
                </button>
            </form>
        </div>
    );
};
