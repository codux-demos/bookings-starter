import classNames from 'classnames';
import styles from './lessons-page.module.scss';
import { useLessons } from '../../api/api-hooks';
import commonStyles from '../../styles/common-styles.module.scss';
import { LessonsList } from '../../components/lessons-list/lessons-list';

export interface LessonsPageProps {
    className?: string;
}

export const LessonsPage = ({ className }: LessonsPageProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>All Lessons</h1>
            <LessonsList />
        </div>
    );
};
