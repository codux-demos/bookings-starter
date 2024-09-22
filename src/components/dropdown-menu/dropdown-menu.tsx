import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import styles from './dropdown-menu.module.scss';
import { WixAPIContext } from '/src/api/wix-api-context-provider';
import downArrow from '/src/assets/svg/down-arrow.svg';
import orangeDownArrow from '/src/assets/svg/orange-down-arrow.svg';
interface menuItem {
    title: string;
    redirectTo: string;
}

export interface DropdownMenuProps {
    menuItems: menuItem[];
    username?: string;
    className?: string;
}

export const DropdownMenu = ({ menuItems, className }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const wixApi = useContext(WixAPIContext);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropDownRef.current &&
                event.target instanceof Node &&
                !dropDownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
    }, []);

    return (
        <div className={classNames(styles.root)}>
            {!username ? (
                <button
                    onClick={onLoginClick}
                    className={classNames(
                        CommonStyles_module.secondaryButton,
                    )}
                >
                    Log In
                </button>
            ) : (
                <div
                    ref={dropDownRef}
                    className={classNames(styles.dropdownContainer)}
                >
                    <div className={classNames(styles.userMenuWrapper)} onClick={() => setIsOpen(!isOpen)}>
                        <p className={styles.userName}>{username}</p>
                        <img
                            src={downArrow}
                            className={classNames(styles.downArrow, styles.defaultArrow)}
                        />
                        <img
                            src={orangeDownArrow}
                            className={classNames(styles.downArrow, styles.hoverArrow)}
                        />
                    </div>
                    <div className={classNames(styles.dropdown, { [styles.open]: isOpen })}>
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.redirectTo}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className={classNames(styles.itemTitle)}>{item.title}</span>
                            </Link>
                        ))}
                        <hr className={styles.divider} />
                        <button onClick={onLoginClick} className={styles.itemTitle}>
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
