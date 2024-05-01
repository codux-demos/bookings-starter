import { createBoard } from '@wixc3/react-board';
import styles from './vars.module.scss';
import cx from 'classnames';
import documentationStyles from '/src/_codux/boards/documentation/documentation.module.scss';

export default createBoard({
    name: 'Theme Variables',
    Board: () => (
        <div className={documentationStyles.root}>
            <p className={styles.Title}>Fonts</p>
            <div className={styles['fonts-layout']}>
                <div className={styles.flex}>
                    <p className={styles.miniTitle}>------ Title styles -----</p>
                    <div className={styles['extra-large-thin-title']}>Extra large thin title</div>
                    <div className={styles['large-thin-title']}>Large thin title</div>
                    <div className={styles['large-title']}>Large title</div>
                    <div className={styles['large-title-mobile']}>Large title mobile</div>
                    <div className={styles['medium-title']}>Medium title</div>
                    <div className={styles['extra-small-title']}>Extra small title</div>
                </div>
                <div className={styles.flex}>
                    <p className={styles.miniTitle}>------ Paragraph styles -----</p>
                    <div className={styles['extra-large-text']}>Extra Large text</div>
                    <div className={styles['large-paragraph']}>Large paragraph</div>
                    <div className={styles['medium-paragraph']}>Medium paragraph</div>
                    <div className={styles['medium-paragraph-bold']}>Medium paragraph bold</div>
                    <div className={styles['small-text-font-bold']}>Small text font bold</div>
                    <div className={styles['small-text']}>Small text</div>
                    <div className={styles['extra-small-text']}>Extra small text</div>
                </div>
            </div>
            <p className={styles.Title}>Colors</p>
            <div className={styles.colors}>
                <div className={styles.wrapper}>
                    <div className={cx(styles.circle, styles.white)}></div>
                    <p className={styles.miniTitle}>White</p>
                </div>
                <div className={styles.wrapper}>
                    <div className={cx(styles.circle, styles.snowWhite)}></div>
                    <p className={styles.miniTitle}>Snow White</p>
                </div>
                <div className={styles.wrapper}>
                    <div className={cx(styles.circle, styles.black)}></div>
                    <p className={styles.miniTitle}>Black</p>
                </div>
                <div className={styles.wrapper}>
                    <div className={cx(styles.circle, styles.charcoalBlack)}></div>
                    <p className={styles.miniTitle}>Charcoal Black</p>
                </div>
            </div>
        </div>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        windowWidth: 1400,
        windowHeight: 768,
    },
});
