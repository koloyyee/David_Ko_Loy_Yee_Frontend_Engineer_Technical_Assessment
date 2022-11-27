import {Button} from '@mui/material';
import {useRouter} from 'next/router';
import {GetStaticProps} from 'next/types';
import {useState} from 'react';
import Footer from '../../components/Footer';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';
import {BookingInterface, StatusEnum} from '../../interfaces/booking.interface';
import styles from '../../styles/Booking.module.css';
import homeStyles from '../../styles/Home.module.css';

const defaultState:BookingInterface = {
  id: '',
  name: '',
  start: 0.0,
  doctorId: '',
  date: '',
  status: StatusEnum.cancel,
};


const Bookings = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [booking, setBooking] = useState<BookingInterface>(defaultState);

  const searchBooking = async (e:React.FormEvent)=>{
    e.preventDefault();

    router.replace(`/booking/${query}`);
  };

  return (
    <>

      <div className={homeStyles.container}>
        <ResponsiveDrawer/>
        <section className={styles.section}>
          <form className={styles.bookingForm} >
            <label htmlFor="bookingId">
        Input your booking id:
            </label>
            <input
              className={styles.input}
              type="text"
              name="bookingId"
              id=""
              onChange={(e)=>setQuery(e.target.value.trim())}
            />
            <Button variant='contained' onClick={searchBooking}>Find</Button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Bookings;

export const getStaticProps: GetStaticProps = async ()=>{
  const bookingData = await fetch(`${process.env.URL}/booking`, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY!,
    },
  });
  const bookings = await bookingData.json();

  return {
    props: {
      bookings: bookings,
    },
  };
};
