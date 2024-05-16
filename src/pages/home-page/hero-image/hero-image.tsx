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
            <picture>
                <source media="(1400px <= width)" srcSet={CoverImageWebp} />
                <source media="(1024px <= width)" srcSet={CoverImageWebp} />
                <source media="(760px <= width)" srcSet={CoverImageWebp} />
                <img src={CoverImageWebp} className={styles.image} alt="Hero background" />
            </picture>
            <div className={styles.overlay}>
                <h1 className={styles['big-title']}>{bottomLabel} </h1>
                {buttonLabel && (
                    <button
                        onClick={onButtonClick}
                        className={classNames(
                            CommonStyles_module.primaryButton,
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
