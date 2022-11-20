import {Alert, AlertColor, AlertTitle, Button, Card, Dialog, FormControl, Stack, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {BookingInterface, StatusEnum} from '../interfaces/booking.interface';
import {OpeningHoursInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Booking.module.css';
import {timeToFloat} from '../utils/datetimeConverts';
import TimeSlot from './TimeSlot';

const TODAY = dayjs().format('YYYY-MM-DD');

const BookingForm = ({
  doctorId,
  openingHours,
  start, end
}: {
  openingHours: OpeningHoursInterface[]
  doctorId:string
  start:string 
end: string}) => {

  const defaultState:BookingInterface ={
    name: '',
    start: 0.0,
    doctorId: doctorId,
    date:'',
    status: StatusEnum.cancel
  };

  const router = useRouter();
  const [error, setError] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs(''));
  const [dialogStatus, setDialogStatus] = useState<AlertColor>('success');
  const [formData, setFormData] = useState<BookingInterface>(defaultState);

  /**
   * formSubmit handle a POST request to API /booking endpoint
   * create a booking
   * assuming id is auto-increment
   * @param {React.FormEvent} e: Form Event
   */
  async function formSubmit(e:React.FormEvent){
    e.preventDefault();
    const time = dateTime?.format('H:mm');
    const date = dateTime?.format('YYYY-MM-DD');
    const floatTime = timeToFloat(time!);
    if(formData.name.length === 0 || time === 'NaN' || date === 'NaN') return;
    setError(false); 
      const body = {
         ...formData, 
         start: floatTime, 
         date: date
      };

      try {

        await fetch('/api/booking/create',{
          method:'POST',
          headers:{'Content-type':'application/json'},
          body: JSON.stringify(body)
        });

      }
      catch(e){
        console.error(e);
        setDialogStatus('error');
      }
      setOpenDialog(true);
      setTimeout(()=>router.replace('/'),3000);

  }

/**
 * inputHandler checks if name input is empty.
 * if empty the button will be disabled 
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - event
 * @returns 
 */
function inputHandler(e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    if(e.target.value.trim() === ''){
      setError(true);
      return;
    } 
    setError(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  }
  
/**
 * pickerHandler - validate the date time picker is not empty
 * if empty the button will be disabled 
 * @param {dayjs.Dayjs | null } newValue - Date time picker value
 * @returns 
 */
function pickerHandler(newValue: dayjs.Dayjs | null){
    newValue? setDateTime(newValue): setError(true);
  }

/**
 * @function disablePicker - return boolean if clinic day is close the same day of the week.
 * @param {dayjs.Dayjs | null} dateTime - dateTime value from date time picker
 * @returns {boolean}
 */
function disablePicker(dateTime: dayjs.Dayjs | null){
  const dayOfWeek = dateTime?.format('ddd').toString().toUpperCase();
    openingHours.map(open =>{
      if (open.isClose && open.day === dayOfWeek){
        return true;
      }
    } );
    return false;
}

  return (
    <Card 
    component='div'
    sx={{ 
      minHeight: 400,
      maxHeight: 500,
      margin: 3,
      padding: 5,
      }}>

  
    <FormControl
    sx={{
      gap: 2
    }}>
      <Typography variant={'h5'}>Found The Right Doctor?</Typography>
              <TextField
              // className={styles.input}
              autoFocus={true}
              type="text"
              name="name"
              id="name"
              onChange={inputHandler}
              required={true}
          label="What's Your Name?"
          error={error}
        />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          className={styles.picker}
          renderInput={(params) => <TextField {...params} />}
          label="Book your time"
          disablePast={true}
          shouldDisableDate={disablePicker}
          value={dateTime}
          onChange={(newValue) => {
            pickerHandler(newValue);
          }}
          minDate={dayjs(TODAY)}
          minTime={dayjs(`${TODAY}T${start}`)}
          maxTime={dayjs(`${TODAY}T${end}`)}
        />
      </Stack>
    </LocalizationProvider>
        
        {dateTime?.format('DD/MM/YY H:mm') !== 'Invalid Date' ? 
        
        <label htmlFor="time-slot" className={styles.label}>

          <TimeSlot start={timeToFloat(dateTime!.format('H:mm'))}/>
          <p>
          Doctor&lsquo;s ID:
          <br/>
          {doctorId}
            </p> 
        </label>:
        ''
      }
        <Button 
        variant="contained" 
        onClick={formSubmit}
        disabled={error}
        >Make Your Booking</Button>
        <Dialog open={openDialog} onClose={()=>{setOpenDialog(false);}}>
        <Alert severity={dialogStatus}>
          <AlertTitle>{dialogStatus.toUpperCase()}!</AlertTitle>
          {
            dialogStatus.toString() === 'success'?
            'We have received your booking, off we go!.'
            :
            'Booking Failed'
          }
          
        </Alert>
      </Dialog>
    </FormControl>
    
    </Card>
  );
};

export default BookingForm;