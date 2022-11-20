/* eslint-disable valid-jsdoc */
import {Button} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {red} from '@mui/material/colors';
import React from 'react';
import {DoctorListingCardInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Card.module.css';
import {floatToTime, sortWeekdays} from '../utils/datetimeConverts';

/**
 *
 * @param {DoctorListingCardInterface}
 * @return {React.Element}
 */
function DocListingCard( {doctor, isListing}:DoctorListingCardInterface) {
  return (
    <Card sx={{

      minHeight: 400,
      maxHeight: 500,
      margin: 3,
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
          <span className={styles.subheading}>Opening Days:</span><br/>{
            sortWeekdays(doctor.opening_hours)}
        </p>
        {doctor.opening_hours.map((open, idx)=> {
          if (open.isClose) {
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
        {isListing ? <Button variant="contained" href={`/doctor/${doctor.id}`}>
            Find Out More
        </Button> : ''}

      </CardContent>

    </Card>
  );
}
export default DocListingCard;
