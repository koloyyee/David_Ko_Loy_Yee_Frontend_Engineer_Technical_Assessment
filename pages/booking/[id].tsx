import {Button, Card, CardContent, Typography} from '@mui/material';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import TimeSlot from '../../components/TimeSlot';
import {BookingInterface} from '../../interfaces/booking.interface';
import {DoctorInterface} from '../../interfaces/doctor.interface';
import styles from '../../styles/Booking.module.css';
import homeStyles from '../../styles/Home.module.css';

const BookingByID = ({booking, doctors}:{booking:BookingInterface,
    doctors: DoctorInterface[]}) => {
        const router = useRouter();

    const doctor = doctors.filter( doctor=>{
        return doctor.id == booking.doctorId;
        
    })[0];
    
  return (
    <>
        <Banner />
    <div className={homeStyles.container}>
        <Nav/>
    <section className={styles.bookingSection}>
    <div 
    className={styles.bookingCard}
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
    <Button className={styles.backButton} onClick={()=>router.back()}> Back </Button>

    </div>
    <Card
    className={styles.bookingCard}
    variant='outlined'
    sx={{
        maxHeight: 300,
        padding: 0,
        margin:0,
    }}
    >
    <CardContent >
        <Typography variant="body1" component="div">
            Doctor name:
            <br></br>
            {doctor.name}
        </Typography>
        <Typography variant="body1" component="div">
            Doctor ID:
            <br></br>
            {doctor.id}
        </Typography>
        <Typography variant="body2" component="div">
            District:
            <br></br>
            {doctor.address.district}
        </Typography>
        <Typography variant="body2" component="div">
            District:
            <br></br>
            {doctor.address.line_1} {doctor.address.line_2} 
        </Typography>

        <Typography variant="body1">
            <TimeSlot start={booking.start}/>
            </Typography>
        </CardContent>
    </Card>
    </section>

    </div>
    <Footer />
    </>
  );
};

export default BookingByID;

export const getServerSideProps: GetServerSideProps = async ({params}) =>{
    const bookingData = await fetch(`${process.env.URL}/booking/${params?.id}`, {
        method: 'GET',
        headers :{
            'x-api-key': process.env.API_KEY!
        }
    }
    );

    const bookingResult = await bookingData.json();
    const doctorData = await fetch(`${process.env.URL}/doctor`, {
        method: 'GET',
        headers :{
            'x-api-key': process.env.API_KEY!
        }
    }
    );

    const doctorResult = await doctorData.json();
    return {
        props:{
            booking: bookingResult,
            doctors: doctorResult 
        }
    };
};