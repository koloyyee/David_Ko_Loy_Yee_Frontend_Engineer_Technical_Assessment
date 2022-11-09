import {Grid} from '@mui/material';
import type {GetStaticProps} from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import DocListingCard from '../components/DocListingCard';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Home.module.css';


const Home= ({doctors}:{doctors: DoctorInterface[]}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NeckTie Doctors Booking</title>
        <meta name="Assessment" content="challenge accepted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner/>
      <main className={styles.main}>
        <Grid container spacing={2}>
        {doctors.map( (doctor, idx)=>(
            <DocListingCard key={idx} doctor={doctor} isListing={true} />
        ))}
        </Grid>


      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async()=>{

    const data= await fetch(`${process.env.URL}/doctor`,{
      mode:'cors',
      method: 'GET',
      headers:{
        'x-api-key': process.env.API_KEY!
      }
    });
    const results: DoctorInterface[] = await data.json();

  return {
    props:{
      doctors: results
    }
  };
};