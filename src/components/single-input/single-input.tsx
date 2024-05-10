import classNames from 'classnames';
import styles from './single-input.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface SingleInputProps {
    className?: string;
    inputTitle: string;
}

export const SingleInput = ({ className, inputTitle }: SingleInputProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            {inputTitle}
            <input className={styles.input} />
            
        </div>
    );
};
