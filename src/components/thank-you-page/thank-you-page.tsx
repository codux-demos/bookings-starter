import classNames from 'classnames';
import styles from './thank-you-page.module.scss';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../router/config';

export interface ThankYouPageProps {
    className?: string;
}

export const ThankYouPage = ({ className }: ThankYouPageProps) => {
    const [search] = useSearchParams();
    const orderId = search.get('orderId');

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.text}>
                <h1 className={styles.title}>Thank You!</h1>
                <p className={styles.paragraph}>
                    You will receive a confirmation email soon. Your order number: {orderId}
                </p>
            </div>
            <Link to={ROUTES.products.to()}>
                <button className={CommonStyles_module.primaryButton} type="button">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
};
