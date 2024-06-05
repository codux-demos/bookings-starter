import classNames from 'classnames';
import styles from './my-bookings-page.module.scss';
import { useBookingHistory, useUpcomingBookings } from '../../api/api-hooks';
import commonStyles from '../../styles/common-styles.module.scss';
import { TabItem, Tabs } from '/src/components/tabs/tabs';
import { format, getDate } from 'date-fns';
import { extendedBookings } from '@wix/bookings';

export type MyBookingsPageProps = {
    className?: string;
}

export type BookingProps = {
    booking: extendedBookings.Booking;
    onCancel?: (booking: extendedBookings.Booking) => void;
}

enum SelectedView {
    UPCOMING = 'UPCOMING',
    HISTORY = 'HISTORY',
}

const Booking = ({ booking, onCancel }: BookingProps) => {
    const date = booking.startDate!;
    return (
        <div className={styles['booking-root']}>
            <div className={styles.content}>
                <div className={styles.date}>
                    <h3 className={styles.day}>{getDate(date)}</h3>
                    <div className={styles['date-short']}>
                        <span className={styles.dayInfo}>{format(date, 'EEE')}</span>
                        <span className={styles['date-month-short']}>{format(date, 'MMM')}</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <span className={styles.label}>{booking.bookedEntity!.title}</span>
                    <span className={styles['full-date']}>
                        {format(date, `MMM d '·' EEE, h:mm a`)}
                    </span>
                </div>
            </div>
            {onCancel && (
                <button className={commonStyles.primaryButton} onClick={() => onCancel(booking)}>
                    Cancel
                </button>
            )}
        </div>
    );
};

export const MyBookingsPage = ({ className }: MyBookingsPageProps) => {
    const { data: myUpcomingBookings, isLoading: isUpcomingBookingsLoading } = useUpcomingBookings();
    const { data: bookingHistory, isLoading: isBookingHistoryLoading } = useBookingHistory();
    // const wixApi = useWixApi();

    const handleCancel = (booking: extendedBookings.Booking) => {
        if (!booking) return;
        // wixApi.cancelBooking({ _id: booking._id, revision: booking.revision });
    };

    if (!myUpcomingBookings && isUpcomingBookingsLoading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>My bookings</h1>
            <Tabs
                items={[
                    { label: 'Upcoming', id: SelectedView.UPCOMING },
                    { label: 'History', id: SelectedView.HISTORY },
                ]}
            >
                <TabItem id={SelectedView.UPCOMING}>
                    {myUpcomingBookings?.extendedBookings.map(({ booking }) => (
                        booking && <Booking booking={booking} key={booking._id} onCancel={handleCancel} />
                    ))}
                </TabItem>
                <TabItem id={SelectedView.HISTORY}>
                    {bookingHistory?.extendedBookings.map(({ booking }) => (
                        booking && <Booking booking={booking} key={booking._id} />
                    ))}
                </TabItem>
            </Tabs>
        </div>
    );
};
