import CommonStyles_module from '../../../styles/common-styles.module.scss';
import classNames from 'classnames';
import styles from './hero-image.module.scss';
import CoverImageWebp from '../../../assets/img/cover-image.webp';

export interface HeroImageProps {
    className?: string;
    topLabel: string;
    topLabelClassName?: string;
    title: string;
    bottomLabel: string;
    buttonLabel?: string;
    onButtonClick?: () => void;
}

export const HeroImage = ({
    title,
    bottomLabel,
    buttonLabel,
    onButtonClick,
    className,
}: HeroImageProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.overlay}>
                <h1 className={styles['big-title']}>{bottomLabel} </h1>
                {buttonLabel && (
                    <button
                        onClick={onButtonClick}
                        className={classNames(
                            CommonStyles_module.primaryButtonVar1,
                            styles['overlay-button'],
                        )}
                    >
                        {buttonLabel}
                    </button>
                )}
            </div>
        </div>
    );
};
