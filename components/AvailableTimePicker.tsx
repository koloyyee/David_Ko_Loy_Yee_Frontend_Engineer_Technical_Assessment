import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import * as React from 'react';

 function AvailableTimePicker({
    start, end
}: {start:string 
end: string}
) {
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(dayjs(null));
  console.log(dateTime!.$H, dateTime!.$m);
  console.log(dateTime!.$y, dateTime!.$M +1, dateTime!.$D);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
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
  );
}
export default AvailableTimePicker; 