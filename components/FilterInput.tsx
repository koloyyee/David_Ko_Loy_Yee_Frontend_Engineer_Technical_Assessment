import {TextField} from '@mui/material';
import {DoctorInterface} from '../interfaces/doctor.interface';

const FilterInput = ({label, list, query, handleChange }:
  { label:string,
    list:DoctorInterface[], 
    query: string, 
    handleChange:(list: DoctorInterface[], query: string)=> void}) => {
  return (
    <TextField
    sx={{
      width: '80%',
      marginBlock: '25px'
    }}
    id="filter-input"
    label= {label}
    defaultValue={query}
    onChange ={(e)=>handleChange(list, e.target.value)}
  />
    );
};

export default FilterInput;