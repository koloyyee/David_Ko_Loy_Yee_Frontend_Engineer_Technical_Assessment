import {GetServerSideProps} from 'next';
import BookingForm from '../../components/BookingForm';
import DocListingCard, {floatToTime} from '../../components/DocListingCard';
import {DoctorInterface} from '../../interfaces/doctor.interface';


const DoctorById = ({doctor}:{doctor: DoctorInterface}) => {
  const start = floatToTime(Number(doctor.opening_hours[0].start));
  const end = floatToTime(Number(doctor.opening_hours[0].end));
  
  return (
    <section >
      <DocListingCard doctor={doctor} isListing={false} /> 
      <BookingForm 
      doctorName={doctor.name}
      doctorId={doctor.id}
      start={start!}
      end={end!} />
    </section>
  );
};

export default DoctorById;

export const getServerSideProps: GetServerSideProps = async({params})=>{
  const data = await fetch(`${process.env.URL}/doctor/${params!.id}`,{
    method: 'GET',
    headers :{
      'x-api-key': process.env.API_KEY!
    }
  });
  const result: DoctorInterface= await data.json();
  return {
    props:{
      doctor: result
    }
  };
};