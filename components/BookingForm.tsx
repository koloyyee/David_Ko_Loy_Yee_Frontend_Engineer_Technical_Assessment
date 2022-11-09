import {Box, Button, Stack} from '@mui/material';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useRouter} from 'next/router';
import React from 'react';
import {BookingInterface, StatusEnum} from '../interfaces/booking.interface';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Booking.module.css';

function timeToFloat(time:string) {
  const arr = time.split(':');
  const minute =String(( Number(arr[1])/6)*10);
  const dec = parseInt(minute, 10);

  return parseFloat(parseInt(arr[0],10) + '.'+ (dec<10? '0':'') + dec);
}

const BookingForm = ({
  doctorName,
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

  const router = useRouter();
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(dayjs(null));
  const [formData, setFormData] = React.useState<BookingInterface>(defaultState);

  /**
   * formSubmit handle a POST request to API /booking endpoint
   * @param {React.FormEvent} e: Form Event
   */
  async function formSubmit(e:React.FormEvent){
    e.preventDefault();
    const time = `${dateTime!.$H}:${dateTime!.$m}`;
    const date = `${dateTime!.$y}-${dateTime!.$M+1}-${dateTime!.$D}`;
    const floatTime = timeToFloat(time);
    if(formData.name.length === 0 || time === 'NaN' || date === 'NaN') return; 
    
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

  return (
    <Box 
    component='div'
    sx={{ 
      maxWidth: 500,
      margin: 3,
      padding: 5,
      boxShadow: '0 0 5px',
      borderRadius: 3
      }}>

  
    <form>
      <label  className={styles.label} htmlFor="doctor-name">
        Doctor
        <p>Name: {doctorName}</p>
        <p>ID: {doctorId}</p>
      </label>
       <label htmlFor="name" className={styles.label} >
           Your Name
            <input 
            className={styles.input}
            type="text"
            name="name"
            id="name"
            onChange={(e)=>setFormData({
              ...formData,
              [e.target.name]: e.target.value.trim().toLowerCase()
            })}
            required={true}
            />
        </label>
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
          minDate={dayjs('2022-02-14')}
          minTime={dayjs(`2022-02-14T${start}`)}
          maxTime={dayjs(`2022-02-14T${end}`)}
        />
      </Stack>
    </LocalizationProvider>
   
        
        <Button variant="contained" onClick={formSubmit}>Make Your Booking</Button>
    </form>
          <Button onClick={()=>router.back()}> Back</Button>
    </Box>
  );
};

export default BookingForm;