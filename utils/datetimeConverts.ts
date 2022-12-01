import {DayEnum, DoctorInterface} from '../interfaces/doctor.interface';

/**
 * @function timeToFloat - convert time back to float format as endpoint.
 * @param {string} time - dayjs datetime format
 * @returns 
 */
export function timeToFloat(time:string) {
    const arr = time.split(':');
    const minute =String(( Number(arr[1])/6)*10);
    const dec = parseInt(minute, 10);
  
    return parseFloat(parseInt(arr[0],10) + '.'+ (dec<10? '0':'') + dec);
  }

/**
 * @function floatToTime convert float number into hh:mm string format.
 * @param {number} number - the time from api. 15.5 = 3:30
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
export function sortWeekdays(openings: DoctorInterface['opening_hours']){
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