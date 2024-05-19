import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import * as Separator from '@radix-ui/react-separator';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import styles from './lesson-details.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface LessonDetailsProps {
    className?: string;
}

export const LessonDetails = ({ className }: LessonDetailsProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Accordion.Root
                className={styles.AccordionRoot}
                type="single"
                defaultValue="item-1"
                collapsible
            >
                <Accordion.Item className={styles.AccordionItem} value="item-1">
                    <AccordionTrigger>Service Details</AccordionTrigger>
                    <AccordionContent>
                        <h2>Lesson Title</h2>
                        <h2>Date and start hour</h2>
                        <h4>Location</h4>
                        <h4>Instructor</h4>
                        <h4>Duration</h4>
                        <h4>Price</h4>
                        <Separator.Root className={styles.Separator} />
                        <button className={styles.nextButton}>Next</button>
                    </AccordionContent>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    );
};

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.PropsWithChildren<{ className?: string }>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className={styles.AccordionHeader}>
        <Accordion.Trigger
            className={classNames(styles.AccordionTrigger, className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <ChevronDownIcon className={styles.AccordionChevron} aria-hidden />
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<{ className?: string }>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={classNames(styles.AccordionContent, className)}
        {...props}
        ref={forwardedRef}
    >
        <div className={styles.AccordionContentText}>{children}</div>
    </Accordion.Content>
));
