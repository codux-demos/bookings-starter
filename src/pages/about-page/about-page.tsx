import classNames from 'classnames';
import styles from './about-page.module.scss';

export interface AboutPageProps {
    className?: string;
}

export const AboutPage = ({ className }: AboutPageProps) => {
    return (
<div className={classNames(styles.root, className)}>
            <div className={styles.text}>
                <h1 className={styles.title}>I&apos;m a Title</h1>
                <p className={styles.paragraph}>
                    I’m a paragraph. Add your own text and edit me on properties panel on the right.
                    It’s easy. Just select me and make changes to the font on the styles panel on
                    the right. I’m a great place for you to tell a story and let your viewers know a
                    little more about you.
                </p>
            </div>
            <img
                src="https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dwixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                alt=""
                className={styles.image}
            />
        </div>
    );
};
