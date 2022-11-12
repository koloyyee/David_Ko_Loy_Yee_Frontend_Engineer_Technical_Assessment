import {Button} from '@mui/material';

import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import Banner from '../../components/Banner';
import BookingForm from '../../components/BookingForm';
import DocListingCard from '../../components/DocListingCard';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import {DoctorInterface} from '../../interfaces/doctor.interface';
import styles from '../../styles/Booking.module.css';
import homeStyles from '../../styles/Home.module.css';
import {floatToTime} from '../../utils/datetimeConverts';

const DoctorById = ({doctor}:{doctor: DoctorInterface}) => {
  const router = useRouter();
  
  const start = floatToTime(Number(doctor.opening_hours[0].start));
  const end = floatToTime(Number(doctor.opening_hours[0].end));

  return (
    <>

    <main className={styles.main}>
      <Banner/>
      <div className={homeStyles.container}>
      <Nav />
    <section className={homeStyles.main}>
      <DocListingCard doctor={doctor} isListing={false} /> 
      <BookingForm 
      openingHours={doctor.opening_hours}
      doctorId={doctor.id}
      start={start!}
      end={end!} />
      
    <Button className={styles.backButton} onClick={()=>router.replace('/')}> Back</Button> 
    </section>

    </div>
    </main>
    <Footer />
    </>
  );
};

export default DoctorById;

export const getServerSideProps: GetServerSideProps = async({params})=>{
  const data = await fetch(`${process.env.URL}/doctor/${params!.id}`,{
    method: 'GET',
    headers :{
      'x-api-key': process.env.API_KEY!
    }
  });
  const result: DoctorInterface= await data.json();
  return {
    props:{
      doctor: result
    }
  };
};