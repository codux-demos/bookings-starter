import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
    const dropDownRef = useRef<HTMLDivElement>(null);
    const wixApi = useContext(WixAPIContext);
    const [username, setUsername] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onLoginClick = async () => {
        if (username) {
            await wixApi.logout();
            setUsername(null);
            setUserImage(null);
        } else {
            await wixApi.initiateLogin();
        }
    };

    useEffect(() => {
        wixApi.fetchUserAuthData().then((response) => {
            if (response) {
                setUsername(response?.user?.member?.profile?.nickname || '');
                setUserImage(response?.user?.member?.profile?.photo?.url || '');
            }
        });
    }, []);

    return (
        <>
            {!username ? (
                <button
                    onClick={onLoginClick}
                    className={classNames(
                        CommonStyles_module.secondaryButton,
                        styles['menu-button'],
                    )}
                >
                    Log In
                </button>
            ) : (
                <div
                    ref={dropDownRef} // Attach the ref to the dropdown container
                    className={classNames(styles.dropdownContainer, styles.root)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={userImage as string} className={styles.userImage} />
                    <div className={classNames(styles.dropdown, { [styles.open]: isOpen })}>
                        {dropdownMenuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.redirectTo}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className={classNames(styles.itemTitle)}>{item.title}</span>
                            </Link>
                        ))}
                        <hr className={styles.divider} />
                        <button onClick={onLoginClick} className={styles.logoutButton}>
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
