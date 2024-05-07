import classNames from 'classnames';
import styles from './lesson-item.module.scss';
import CommonStyles_module from '../../styles/common-styles.module.scss';

export interface LessonItemProps {
    title: string;
    price: string;
    link: string;
    className?: string;
}

export const LessonItem = ({ title, price, link, className }: LessonItemProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>{title}</h1>
            <span className={CommonStyles_module.price}>{price}</span>
            <button
                className={classNames(CommonStyles_module.primaryButton, styles.bookNow)}
                onClick={() => link}
            >
                Book Now
            </button>
        </div>
    );
};
