import classNames from 'classnames';
import styles from './lesson-page.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '/src/router/config';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import CommonStyles_module from '../../styles/common-styles.module.scss';

export interface LessonPageProps {
    className?: string;
}

export const LessonPage = ({ className }: LessonPageProps) => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);

    console.log('Lesson Data:', data);
    console.log('Lesson Availability Data:', availability);

    if (!availability && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <button className={classNames(styles.backButton, CommonStyles_module.secondaryButton)}>
                <ChevronLeftIcon /> Back
            </button>
            <h2 className={styles.lessonTitle}>{data?.name}</h2>
            <h4>{data?.description}</h4>
        </div>
    );
};
