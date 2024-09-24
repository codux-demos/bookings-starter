import { createBoard } from '@wixc3/react-board';
import styles from './new-board.module.scss';
import documentationStyles from '/src/_codux/boards/documentation/documentation.module.scss';

export default createBoard({
    name: 'New Board',
    Board: () => (
        <div className={documentationStyles.root}>
            <div className={documentationStyles.box}>
                <p className={styles.myStyle}>this is a section</p>
            </div>
        </div>
    ),
    isSnippet: false,
    environmentProps: {
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
