import { Container, Grid } from '@mui/material';

import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '@/assets';
import Page from '@/components/Page';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  BookingBookedRoom,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingDetails,
  BookingNewestBooking,
  BookingReservationStats,
  BookingRoomAvailable,
  BookingTotalIncomes,
  BookingWidgetSummary,
} from '@/sections/@dashboard/general/booking';

export default function GeneralBooking() {
  const themeStretch = useAppSelector((state) => state.settings.themeStretch);

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Total Booking"
              total={714000}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Check In" total={311000} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Check Out"
              total={124000}
              icon={<CheckOutIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingRoomAvailable />
          </Grid>

          <Grid item xs={12} md={8}>
            <BookingReservationStats />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid>

          <Grid item xs={12}>
            <BookingNewestBooking />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
