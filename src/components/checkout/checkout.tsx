import classNames from 'classnames';
import styles from './checkout.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import CommonStyles_module from '../../styles/common-styles.module.scss';

export interface CheckoutProps {
    className?: string;
}

export const Checkout = ({ className }: CheckoutProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles['left-section']}>
                <h6 className={styles.title}>Client details</h6>
                <form id="checkout-form">
                    <div className={styles.section}>
                        <label className={commonStyles['input-label']} htmlFor="first-name">
                            Name
                            <input
                                id="first-name"
                                type="text"
                                aria-required
                                required
                                name="name"
                                maxLength={100}
                            />
                        </label>
                        <label className={commonStyles['input-label']} htmlFor="email">
                            Email
                            <input
                                id="email"
                                type="email"
                                required
                                aria-required
                                pattern="^.+@.+\.[a-zA-Z]{2,63}$"
                                name="email"
                                maxLength={150}
                            />
                        </label>
                    </div>
                    <label className={commonStyles['input-label']} htmlFor="last-name">
                        Last name
                        <input id="last-name" type="text" name="lastName" maxLength={150} />
                    </label>
                    <label className={commonStyles['input-label']} htmlFor="phone">
                        Phone
                        <input id="phone" type="phone" name="phone" maxLength={100} />
                    </label>
                    <label className={commonStyles['input-label']} htmlFor="phone">
                        Add your message
                        <input id="message" type="text" name="message" maxLength={200} />
                    </label>
                </form>
            </div>
            <div className={styles['booking-details']}>
                <div className={styles['booking-details-content']}>
                    <h4 className={styles['booking-details-title']}>Booking Details</h4>
                    <span>Yoga nidra</span>
                    <span>14 May 2004 at 15:00</span>
                    <div
                        className={classNames(
                            CommonStyles_module.chip,
                            styles['availability-chip'],
                        )}
                    >
                        <span>Available Online</span>
                    </div>
                    <div className={styles['secondary-info']}>
                        <span>Online</span>
                        <span>Dana</span>
                        <span>1 hr</span>
                    </div>
                </div>
                <button
                    type="submit"
                    className={classNames(
                        CommonStyles_module.primaryButton,
                        styles['checkout-button'],
                    )}
                    form="checkout-form"
                >
                    Book now
                </button>
            </div>
        </div>
    );
};
