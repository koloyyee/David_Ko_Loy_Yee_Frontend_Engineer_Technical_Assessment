import {GetServerSideProps} from 'next';
import BookingForm from '../../components/BookingForm';
import {floatToTime} from '../../components/DocListingCard';
import {DoctorInterface} from '../../interface/doctor.interface';


const DoctorById = ({doc}:{doc: DoctorInterface}) => {
  const start = floatToTime(Number(doc.opening_hours[0].start));
  const end = floatToTime(Number(doc.opening_hours[0].end));
  
  return (
    <section >
      <BookingForm 
      doctorName={doc.name}
      doctorId={doc.id}
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
      doc: result
    }
  };
};