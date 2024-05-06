import { useState } from 'react';
import classNames from 'classnames';
import styles from './products-page.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/config';
import { ProductCard } from '../../components/product-card/product-card';
import { useUpcomingBookings } from '../../api/api-hooks';
import { getImageHttpUrl } from '../../api/wix-image';
import commonStyles from '../../styles/common-styles.module.scss';
import { TabItem, Tabs } from '/src/components/tabs/tabs';

export interface ProductsPageProps {
    className?: string;
}


const Booking = ({ booking }: { booking: any }) => {
    return (
        <div>
            <div className={styles.date}>
                <div className={styles.day}>

                </div>
                <div className={styles.dayInfo}>

                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.label}>

                </div>
                <div className={styles.fullDate}>

                </div>
            </div>
        </div>
    )
}

export const MyBookingsPage = ({ className }: ProductsPageProps) => {
    const [activeTab, setActiveTab] = useState('myBookings');
    const { data: myUpcomingBookings, isLoading } = useUpcomingBookings();
    console.log('!', myUpcomingBookings);
    if (!myUpcomingBookings && isLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>All Products</h1>
            <Tabs items={[{ label: 'My Bookings', id: 'myBookings' }, { label: 'Booking history', id: 'bookingHistory' }]}>
                <TabItem id="myBookings">
                    {myUpcomingBookings?.map((booking) => (
                        <Booking booking={booking} />
                    ))}
                </TabItem>
            </Tabs>
        </div>
    );
};