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
                <h3 className={ProfilePage_module['profile-title']}>Personal info</h3>
                <form className={ProfilePage_module['profile-form']}>
                    <div className={ProfilePage_module['fields-section']}>
                        <label className={commonStyles['input-label']} htmlFor="first-name">
                            First name
                            <input
                                id="first-name"
                                type="text"
                                aria-required
                                defaultValue={myProfileData?.member?.contact?.firstName ?? ''}
                                required
                            />
                        </label>
                        <label className={commonStyles['input-label']} htmlFor="last-name">
                            Last name
                            <input
                                id="last-name"
                                defaultValue={myProfileData?.member?.contact?.lastName ?? ''}
                                type="text"
                            />
                        </label>
                    </div>
                    <div className={ProfilePage_module['fields-section']}>
                        <label className={commonStyles['input-label']} htmlFor="phone">
                            Phone
                            <input
                                id="phone"
                                type="phone"
                                pattern="^.+@.+\\.[a-zA-Z]{2,63}$"
                                defaultValue={myProfileData?.member?.contact?.phones?.[0] ?? ''}
                            />
                        </label>
                        <label className={commonStyles['input-label']} htmlFor="email">
                            Email
                            <input
                                id="email"
                                defaultValue={myProfileData?.member?.loginEmail ?? ''}
                                type="email"
                                required
                                aria-required
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={classNames(
                            commonStyles.primaryButton,
                            ProfilePage_module['profile-submit'],
                        )}
                    >
                        Update info
                    </button>
                </form>
            </div>
        </div>
    );
};
