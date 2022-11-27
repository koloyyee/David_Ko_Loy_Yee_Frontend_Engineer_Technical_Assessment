import {Avatar, Card, CardContent, CardHeader} from '@mui/material';
import {red} from '@mui/material/colors';
import {BookingInterface} from '../interfaces/booking.interface';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Card.module.css';
import TimeSlot from './TimeSlot';

const BookingCard = ({time, doctor, status}:
  {time: number,
    doctor: DoctorInterface,
    status: BookingInterface['status']}) => {
  return (
    <Card sx={{

      minHeight: 400,
      maxHeight: 500,
      maxWidth: 500,
      margin: 2,
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[600]}} aria-label="">
            {doctor.name[0]}
          </Avatar>
        }
        title={doctor.name}
        subheader={`id: ${doctor.id}`}
      />
      <CardContent>
        <p>
          <span className={styles.subheading}>
            District:</span> {doctor.address.district}
        </p>
        <p>
          <span className={styles.subheading}>
            Address:</span> {doctor.address.line_1}
          <br/> {doctor.address.line_2}
        </p>
        <p>
          <span className={styles.subheading}>
            Status:</span> {status}
        </p>
        <TimeSlot start={time}/>
      </CardContent>

    </Card>
  );
};

export default BookingCard;
