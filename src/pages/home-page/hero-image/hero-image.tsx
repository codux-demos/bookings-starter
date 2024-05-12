import CommonStyles_module from '../../../styles/common-styles.module.scss';
import mediumHeroImage from '../../../assets/img/[760_460]_heroImage04.jpg';
import largeHeroImage from '../../../assets/img/[1024_640]_heroImage04.jpg';
import xLargeHeroImage from '../../../assets/img/[1400_640]_heroImage04.jpg';
import classNames from 'classnames';
import styles from './hero-image.module.scss';

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
                <div className={styles.overlay}>
                    <h1 className={styles['small-title']}>PULSEFIT STUDIO</h1>
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
                <source media="(1400px <= width)" srcSet={xLargeHeroImage} />
                <source media="(1024px <= width)" srcSet={largeHeroImage} />
                <source media="(760px <= width)" srcSet={mediumHeroImage} />
                <img
                    src="https://static.wixstatic.com/media/5e4fbc4a92024e92b259b53b0f9c9b9b.jpg/v1/fill/w_1576,h_1392,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/Rooftop%20Yoga.jpg"
                    className={styles.image}
                    alt="Hero background"
                />
            </picture>
        </div>
    );
};
