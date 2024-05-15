import classNames from 'classnames';
import { useMyProfile } from '../../api/api-hooks';
import commonStyles from '../../styles/common-styles.module.scss';
import ProfilePage_module from './profile-page.module.scss';

export const ProfilePage = () => {
    const { data: myProfileData, isLoading: isProfileDataLoading } = useMyProfile();

    if (!myProfileData && isProfileDataLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }
    return (
        <div className={ProfilePage_module.root}>
            <div className={ProfilePage_module.content}>
                <form>
                    <div className={ProfilePage_module['fields-section']}>
                        <label className={commonStyles['input-label']}>
                            Label
                            <input />
                        </label>
                        <label className={commonStyles['input-label']}>
                            Label
                            <input />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};
