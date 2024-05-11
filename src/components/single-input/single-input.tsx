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
    const styleToApply = hasError ? styles.inputError : styles.input;
    const styleToApply1 = styles.input;

    return (
        <div className={classNames(styles.root, className)}>
            {inputTitle}
            {isMandatory ? ' *' : true}
            <input className={classNames(styleToApply)} />
            <div className={styles.errormessage}>
                {hasError ? <p>Please fill this field. </p> : true}
            </div>
        </div>
    );
};
