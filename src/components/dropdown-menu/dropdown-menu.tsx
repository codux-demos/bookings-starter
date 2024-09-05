import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import styles from './dropdown-menu.module.scss';
import { WixAPIContext } from '/src/api/wix-api-context-provider';

//TODO - Implement the logout function.
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
    const [userImage, setUserImage] = useState<string | null>(null);

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
