import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountSvg from '../../assets/svg/account.svg';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import styles from './dropdown-menu.module.scss';

function login() {
    // TODO: once login is implemented, use it instead of this function.
}

function logout() {
    // TODO: once logout is implemented, use it instead of this function.
}

interface DropdownMenuItem {
    title: string;
    redirectTo: string;
}

export interface DropdownMenuProps {
    dropdownMenuItems: DropdownMenuItem[];
    username?: string;
    className?: string;
}

export const DropdownMenu = ({ dropdownMenuItems, username, className }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames(styles.root, className)}>
            <button
                onClick={() => (username ? setIsOpen(!isOpen) : login())}
                className={classNames(CommonStyles_module.secondaryButton, styles['menu-button'])}
            >
                <span>{username ?? 'Log In'}</span>
                <img src={AccountSvg} alt="" height="26px" width="26px" />
            </button>
            {isOpen && username && (
                <nav className={styles.menu}>
                    <ul className={styles['menu-list']}>
                        {dropdownMenuItems.map((item) => (
                            <li key={item.title} className={styles['menu-item']}>
                                <Link to={item.redirectTo}>{item.title}</Link>
                            </li>
                        ))}
                        <li className={styles['menu-item']}>
                            <span onClick={logout}>Log Out</span>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};
