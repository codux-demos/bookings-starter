import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import * as Separator from '@radix-ui/react-separator';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import styles from './lesson-details.module.scss';
import commonStyles from '@styles/common-styles.module.scss';

export interface LessonDetailsProps {
    className?: string;
    title?: string;
    startDate?: string;
    location?: string;
    duration?: string;
    price?: string;
}

export const LessonDetails = ({
    className,
    title,
    startDate,
    location,
    duration,
    price,
}: LessonDetailsProps) => {
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
                        <h2 className={styles.lessonTitle}>{title}</h2>
                        <h2>{startDate}</h2>
                        <h4>{location}</h4>
                        <h4>{duration}</h4>
                        <h4>{price}</h4>
                    </AccordionContent>
                </Accordion.Item>
                <Separator.Root className={styles.Separator} />
                <button className={styles.nextButton}>Next</button>
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
