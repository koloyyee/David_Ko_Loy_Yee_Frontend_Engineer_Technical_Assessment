/* eslint-disable require-jsdoc */
import {
  Alert,
  AlertColor,
  AlertTitle, Button, Dialog, Typography
} from '@mui/material';
import {useRouter} from 'next/router';
import {useState} from 'react';
import BookingCard from '../../components/BookingCard';
import Footer from '../../components/Footer';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';
import {BookingInterface, StatusEnum} from '../../interfaces/booking.interface';
import {DoctorInterface} from '../../interfaces/doctor.interface';
import styles from '../../styles/Booking.module.css';

const BookingByID = ({booking, doctors}:{booking:BookingInterface,
    doctors: DoctorInterface[]}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<AlertColor>('success');
  const router = useRouter();

  const doctor = doctors.filter( (doctor)=>{
    return doctor.id == booking.doctorId;
  })[0];
  async function cancelBooking() {
    const updateBooking = {
      ...booking,
      status: StatusEnum.cancel,
    };
    try {
      const res = await fetch('/api/booking/cancel', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updateBooking),
      });
      const status = await res.json();
      console.log(status);
      if (status !== 200) { // check if success.
        setDialogStatus('error');
        setOpenDialog(true);
        return;
      }
      setTimeout(()=>{ // back to homepage if booking cancelled
        router.replace('/');
      }, 5000);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>

      <ResponsiveDrawer/>
      <section className={styles.bookingSection}>
        <div
          className={styles.welcome}
        >

          <Typography sx={{fontSize: 18}} color="text.secondary" gutterBottom>

          </Typography>
          <Typography variant="h5" component="div">
              Hi!
            <p> {booking.name}</p>
          </Typography>
          <Typography variant="body2" component="div">
            <p> Thank you for booking with us</p>
            <p> You will find the booking details here.</p>
          </Typography>
          <Button variant='outlined'
            className={styles.backButton}
            onClick={()=>router.back()}> Back </Button>
          <Button variant='contained'
            color='error'
            className={styles.backButton}
            onClick={cancelBooking}> CANCEL BOOKING </Button>
        </div>


        <BookingCard
          time={booking.start}
          doctor={doctor}
          status={booking.status} />
        <Dialog open={openDialog} onClose={()=>{
          setOpenDialog(false);
        }}>
          <Alert severity={dialogStatus}>
            <AlertTitle>{dialogStatus.toUpperCase()}!</AlertTitle>
            {
            dialogStatus.toString() === 'success'?
            'Booking Cancelled, Back to Home!.' :
            'Booking Failed to Cancel'
            }

          </Alert>
        </Dialog>

      </section>


      <Footer />
    </>
  );
};

export default BookingByID;


