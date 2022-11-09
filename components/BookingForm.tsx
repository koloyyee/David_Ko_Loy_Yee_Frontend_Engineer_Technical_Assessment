import {Box, Button, FormControl, Stack, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {BookingInterface, StatusEnum} from '../interfaces/booking.interface';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Booking.module.css';

const TODAY = dayjs().format('YYYY-MM-DD');

function timeToFloat(time:string) {
  const arr = time.split(':');
  const minute =String(( Number(arr[1])/6)*10);
  const dec = parseInt(minute, 10);

  return parseFloat(parseInt(arr[0],10) + '.'+ (dec<10? '0':'') + dec);
}

const BookingForm = ({
  doctorId,
  start, end
}: {
  doctorName: DoctorInterface['name']
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

  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs(''));
  const [formData, setFormData] = useState<BookingInterface>(defaultState);
  const [error, setError] = useState(true);
  
  const router = useRouter();


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
      }
  }

  /**
   * inputHandler checks if name input is empty.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e- event
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


  return (
    <Box 
    component='div'
    sx={{ 
      minHeight: 400,
      maxHeight: 500,
      margin: 3,
      padding: 5,
      boxShadow: '0 1px 2px',
      borderRadius: 1.2
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
          value={dateTime}
          onChange={(newValue) => {
            setDateTime(newValue);
          }}
          minDate={dayjs(TODAY)}
          minTime={dayjs(`${TODAY}T${start}`)}
          maxTime={dayjs(`${TODAY}T${end}`)}
        />
      </Stack>
    </LocalizationProvider>
        
        {dateTime?.format('DD/MM/YY H:mm') !== 'Invalid Date' ? 
        
        <label htmlFor="time-slot" className={styles.label}>
          Time Slot
          <p>{dateTime?.format('H:mm')} - {`${Number(dateTime?.format('H'))+1}:${dateTime?.format('mm')}`}  </p>
        </label>:
        ''
      }
        <Button variant="contained" onClick={formSubmit}>Make Your Booking</Button>
    <Button onClick={()=>router.back()}> Back</Button> 
    </FormControl>
    </Box>
  );
};

export default BookingForm;