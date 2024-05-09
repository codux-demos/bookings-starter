import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './tabs.module.scss';

export interface TabsProps {
    items: { label: string; id: string }[];
    defaultId?: string;
    children: React.ReactNode;
}

export interface TabItemProps {
    id: string;
    children: React.ReactNode;
}

export const Tabs = ({ items, defaultId, children }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultId || items[0].id);

    const renderTabContent = (children: React.ReactNode) => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.props.id === activeTab) {
                return child;
            }
        });
    };

    return (
        <div className={styles['tabs-root']}>
            <div className={styles.tabs}>
                {items.map((item) => (
                    <div
                        onClick={() => setActiveTab(item.id)}
                        className={classNames(styles.tab, {
                            [styles.active]: item.id === activeTab,
                        })}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <hr />
            {renderTabContent(children)}
        </div>
    );
};

export const TabItem = ({ id, children }: TabItemProps) => {
    return <div>{children}</div>;
};
