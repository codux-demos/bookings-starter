import classNames from 'classnames';
import styles from './single-input.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface SingleInputProps {
    className?: string;
    inputTitle: string;
    hasError?: boolean;
    isMandatory?: boolean;
}

export const SingleInput = ({ className, inputTitle, hasError, isMandatory }: SingleInputProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            {inputTitle}
            {isMandatory ? (
                " *"
            ) : (
                true
            )}   
            <input className={styles.input} />
            <div>
            {hasError ? (
                <p>Please fill this field. </p>
            ) : (
                true
            )}
            </div>
            
        </div>
    );
};
