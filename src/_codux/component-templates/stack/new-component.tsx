import classNames from 'classnames';
import styles from './new-component.module.scss';

export interface NewComponentProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NewComponent = ({ className }: NewComponentProps) => {
    return (
        <div className={classNames(className, styles.root)}>
            <div>
                <img
                    src="https://wixmp-b7f7090100b13623109851bc.wixmp.com/layouters-starters/img_01.jpg"
                    alt=""
                    className={styles.img}
                />
            </div>
            <div className={styles.section}>
                <img
                    src="https://wixmp-b7f7090100b13623109851bc.wixmp.com/layouters-starters/img_02.jpg"
                    alt=""
                    className={styles.img}
                />
                <img
                    src="https://wixmp-b7f7090100b13623109851bc.wixmp.com/layouters-starters/img_03.jpg"
                    alt=""
                    className={styles.img}
                />
            </div>
        </div>
    );
};
