import {Button} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {red} from '@mui/material/colors';
import {DayEnum, DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Card.module.css';

/**
 * @function floatToTime convert float number into hh:mm format.
 * @param {number} number- the time from api. 15.5 = 3:30
 * @returns 
 */
export function floatToTime(number: number){
  if(number <0) return;

  const hour = Math.floor(number);
  let part = number - hour;
  const min = 1/60;
  part = min * Math.round(part/min);
  
  let minute = Math.floor(part * 60) + '';

  if (minute.length < 2){
    minute= '0'+minute;
  }

  return hour + ':' + minute;
}


/**
 * @function sortWeekdays - is sort the abbreviated day with enum. 
 * @param {DoctorInterface['opening_hours']} openings - unsorted array of days
 * @returns {string} - A sorted array of weekdays and joint into a string.
 */
function sortWeekdays(openings: DoctorInterface['opening_hours']){
  const weekdayOrder= Object.values(DayEnum);
  let restDay = '';
  const weekdaysToBeSorted = openings.map(open => open.isClose? restDay = open.day : open.day);
  const sortedWeekdays = weekdaysToBeSorted.sort((a,b)=>  weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b!));
  const weekdaysArr = Object.values(sortedWeekdays);
  if (restDay !== ''){
    return restDay;
  }
  return weekdaysArr.join(', ');

}

interface DoctorListingCardInterface{
  doctor: DoctorInterface,
  isListing :boolean
}

function DocListingCard( {doctor, isListing}:DoctorListingCardInterface) {

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
          <p>
            <span className={styles.subheading}>Opening Days:</span><br/>{
              sortWeekdays(doctor.opening_hours)}
          </p>
          {doctor.opening_hours.map((open, idx)=> {
            if (open.isClose){
              return (

                <p key={idx}>
                <span className={styles.subheading}>Rest Days:</span>
                <br/>
                {open.day}
              </p>
              );
              
            }
          })}
          
          <p>
            <span className={styles.subheading}>Opening Hours:</span> <br/>
          {`${floatToTime(Number(doctor.opening_hours[0].start))} - 
          ${floatToTime(Number(doctor.opening_hours[0].end))}`}
          </p>
          {isListing ? <Button variant="contained" href={`/booking/${doctor.id}`}>
            Find Out More
          </Button> : ''}
          
      </CardContent>
     
    </Card>
  );
}
export default DocListingCard; 