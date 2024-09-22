import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountSvg from '../../assets/svg/account.svg';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import styles from './dropdown-menu.module.scss';
import { WixAPIContext } from '/src/api/wix-api-context-provider';

interface DropdownMenuItem {
    title: string;
    redirectTo: string;
}

export interface DropdownMenuProps {
    dropdownMenuItems: DropdownMenuItem[];
    username?: string;
    className?: string;
}

export const DropdownMenu = ({ dropdownMenuItems, className }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wixApi = useContext(WixAPIContext);
    const [username, setUsername] = useState<string | null>(null);

    const onLoginClick = async () => {
        if (username) {
            await wixApi.logout();
            setUsername(null);
        } else {
            await wixApi.initiateLogin();
        }
    };

    useEffect(() => {
        wixApi.fetchUserAuthData().then((response) => {
            if (response) {
                setUsername(response?.user?.member?.profile?.nickname || username);
            }
        });
    }, [])

    return (
        <div className={classNames(styles.root, className)}>
            <button
                onClick={onLoginClick}
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
                            <span >Log Out</span>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};
