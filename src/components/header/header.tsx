import classNames from 'classnames';
import styles from './header.module.scss';
import { ROUTES } from '../../router/config';
import { Link } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { useMyProfile } from '/src/api/api-hooks';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const { data: myProfile } = useMyProfile()
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
                    to={ROUTES.about.to()}
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    About
                </Link>
                <DropdownMenu
                    menuItems={[
                        {
                            title: 'My Profile',
                            redirectTo: ROUTES.myProfile.to(),
                        },
                        {
                            title: 'My Bookings',
                            redirectTo: ROUTES.myBookings.to(),
                        }
                    ]}
                    username={myProfile?.member?.contact?.firstName ?? undefined}
                />
            </div>
        </div>
    );
};
