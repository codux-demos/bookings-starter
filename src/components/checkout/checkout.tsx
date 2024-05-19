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
            <h6 className={styles.title}>Customer details </h6>
            <form>
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
                <label className={commonStyles['input-label']} htmlFor="phone">
                    Add your message
                    <input id="message" type="text" name="message" maxLength={200} />
                </label>
                <button
                    type='submit'
                    className={classNames(CommonStyles_module.primaryButton, styles['checkout-button'])}
                >
                    Continue
                </button>
            </form>
        </div>
    );
};
