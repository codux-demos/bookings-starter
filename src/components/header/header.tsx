import classNames from 'classnames';
import styles from './header.module.scss';
import { ROUTES } from '../../router/config';
import { Link } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Link to="/" className={styles.logo}>
                LOGO
            </Link>
            <div className={styles.menu}>
                <Link
                    to="/"
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    Home
                </Link>
                <Link
                    to={ROUTES.lessons.to()}
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    Lessons
                </Link>
                <Link
                    to={ROUTES.myBookings.to()}
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    My bookings
                </Link>
                <Link
                    to={ROUTES.about.to()}
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    About
                </Link>
                <DropdownMenu
                    dropdownMenuItems={[
                        {
                            title: 'My Account',
                            redirectTo: '',
                        },
                    ]}
                    username="John Joe"
                />
            </div>
        </div>
    );
};
