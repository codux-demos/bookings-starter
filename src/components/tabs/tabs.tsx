import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './products-page.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/config';
import { ProductCard } from '../../components/product-card/product-card';
import { useUpcomingBookings } from '../../api/api-hooks';
import { getImageHttpUrl } from '../../api/wix-image';
import commonStyles from '../../styles/common-styles.module.scss';

export interface TabsProps {
    items: { label: string, id: string }[];
    defaultId?: string;
    children: React.ReactNode;
}


export interface TabItemProps {
    id: string;
    children: React.ReactNode;
}


export const Tabs = ({ items, defaultId, children }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultId || items[0].id);
    const { data: myUpcomingBookings, isLoading } = useUpcomingBookings();

    if (!myUpcomingBookings && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    const renderTabContent = (children: React.ReactNode) => {
        return React.Children.map(children, child => {
            if (React.isValidElement(child) && child.props.id === activeTab) {
                return child;
            }
        });
    };

    return (
        <div className={styles.tabs}>
            {items.map((item) => (
                <div onClick={() => setActiveTab(item.id)} className={classNames(styles.tab, { [styles.active]: item.id === activeTab })}>
                    {item.label}
                </div>
            ))}
            <hr />
            {renderTabContent(children)}
        </div>
    );
};

export const TabItem = ({ id, children }: TabItemProps) => {
    return <div>{children}</div>;
};