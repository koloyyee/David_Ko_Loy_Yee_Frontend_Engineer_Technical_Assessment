import {Avatar, Card, CardContent, CardHeader} from '@mui/material';
import {red} from '@mui/material/colors';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Card.module.css';
import TimeSlot from './TimeSlot';

const BookingCard = ({time,doctor}:{time: number, doctor: DoctorInterface}) => {
  return (
    <Card sx={{
      
      minHeight: 400,
      maxHeight: 500,
      margin: 3
      }}>
          <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[600] }} aria-label="">
            {doctor.name[0]}
          </Avatar>
        }
        title={doctor.name}
        subheader={`id: ${doctor.id}`}
      />
        <CardContent>
        <p>
            <span className={styles.subheading}>District:</span> {doctor.address.district}
          </p>
          <p>
            <span className={styles.subheading}>Address:</span> {doctor.address.line_1} <br/> {doctor.address.line_2}
          </p>
          <TimeSlot start={time}/>
        </CardContent>

    </Card>
  );
};

export default BookingCard;