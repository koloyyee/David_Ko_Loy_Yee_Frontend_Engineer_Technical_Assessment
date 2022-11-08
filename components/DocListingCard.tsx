import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {red} from '@mui/material/colors';
import {DayEnum, DoctorInterface} from '../interface/doctor.interface';
import styles from '../styles/Card.module.css';
import ActionLink from './ActionLink';

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



function DocListingCard(doc: DoctorInterface, listing :boolean) {

  return (
    <Card sx={{ 
      minWidth: 345,
      margin: 3
      }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[600] }} aria-label="">
            {doc.name[0]}
          </Avatar>
        }
        title={doc.name}
        subheader={doc.id}
      />
   
      <CardContent>
          <p>
            <span className={styles.subheading}>District:</span> {doc.address.district}
          </p>
          <p>
            <span className={styles.subheading}>Address:</span> {doc.address.line_1} <br/> {doc.address.line_2}
          </p>
          <p>
            <span className={styles.subheading}>Opening Days:</span><br/>{
              sortWeekdays(doc.opening_hours)}
          </p>
          {doc.opening_hours.map((open, idx)=> {
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
          {`${floatToTime(Number(doc.opening_hours[0].start))} - 
          ${floatToTime(Number(doc.opening_hours[0].end))}`}
          </p>
        <ActionLink callForAction='Find Out More.' href={`/booking/${doc.id}`}/>
      </CardContent>
     
    </Card>
  );
}
export default DocListingCard; 