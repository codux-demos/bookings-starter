import { useMyProfile } from '../../api/api-hooks'
import commonStyles from '../../styles/common-styles.module.scss';

export const MyBookingsPage = () => {
    const { data: myProfileData, isLoading: isProfileDataLoading } = useMyProfile();

    if (!myProfileData && isProfileDataLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }
    return (
       <div/>
    );
};