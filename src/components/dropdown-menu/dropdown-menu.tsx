import classNames from 'classnames';
import styles from './dropdown-menu.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { useState } from 'react';
import AccountSvg from '../../assets/svg/account.svg';

function login() {
    // TODO: once login is implemented, use it instead of this function.
}

export interface DropdownMenuProps {
    username?: string;
    className?: string;
}

export const DropdownMenu = ({ username, className }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames(styles.root, className)}>
            <button
                onClick={() => (username ? setIsOpen(!isOpen) : login())}
                className={styles['menu-button']}
            >
                {username ?? 'Log In'}
                <img src={AccountSvg} alt="" />
            </button>
            {isOpen && username && (
                <ul>
                    <li className={styles['menu-item']}>My Account</li>
                    <li className={styles['menu-item']}>My Bookings</li>
                    <li className={styles['menu-item']}>My Wallet</li>
                    <li className={styles['menu-item']}>My Orders</li>
                    <li className={styles['menu-item']}>My Addresses</li>
                    <li className={styles['menu-divider']}></li>
                    <li className={styles['menu-item']}>Log Out</li>
                </ul>
            )}
        </div>
    );
};
