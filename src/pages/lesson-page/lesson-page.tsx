import classNames from 'classnames';
import styles from './lesson-page.module.scss';
import commonStyles from '@styles/common-styles.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '/src/router/config';
import { useAvailability, useLessonBySlug } from '/src/api/api-hooks';

export interface LessonPageProps {
    className?: string;
}

export const LessonPage = ({ className }: LessonPageProps) => {
    const { slug } = useParams<RouteParams['/lesson/:slug']>();
    const { data } = useLessonBySlug(slug);
    const { data: availability, isLoading } = useAvailability(data?._id!);
    console.log(availability);

    if (!availability && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return <div className={classNames(styles.root, className)}>LessonPage</div>;
};
