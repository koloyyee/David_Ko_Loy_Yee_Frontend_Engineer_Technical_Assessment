import dayjs from 'dayjs';
import {BookingInterface} from '../interfaces/booking.interface';
import {floatToTime} from '../utils/datetimeConverts';

const TimeSlot = ({start}: {start: BookingInterface['start']}) => {
    const TODAY = dayjs().format('YYYY-MM-DD');
    const startTime = floatToTime(start);
    const startDateTime = dayjs(`${TODAY}${startTime}`);
    const endHour = Number(startDateTime.format('H'))+1;
    const endMinutes = startDateTime.format('mm');


  return (
    <label htmlFor="time-slot">
        Time slot:
     <br/> {`${startTime} - ${endHour}:${endMinutes}`}
    </label>
  );
};

export default TimeSlot;