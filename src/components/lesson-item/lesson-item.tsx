import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/config';
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
            <Link className={styles.bookNow} to={ROUTES.lesson.to(link)}>
                <button className={CommonStyles_module.primaryButton}>
                    Book Now
                </button>
            </Link>
        </div>
    );
};
