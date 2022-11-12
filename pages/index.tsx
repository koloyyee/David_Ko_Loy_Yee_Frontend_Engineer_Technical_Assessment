import {Grid} from '@mui/material';
import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import DocListingCard from '../components/DocListingCard';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Home.module.css';

const Home:NextPage<{doctors: DoctorInterface[]}>= ({doctors}:{doctors: DoctorInterface[]}) => {


  return (
    <div >
      <Head>
        <title>NeckTie Doctors Booking</title>
        <meta name="Assessment" content="challenge accepted" />
        <link rel="icon" href="/public/tie.png" />
      </Head>

      <Banner/>
      <div className={styles.container}>

      <Nav/>
      <main className={styles.main}>
        <Grid container spacing={2}>
        {doctors.map( (doctor, idx)=>(
            <DocListingCard key={idx} doctor={doctor} isListing={true} />
        ))}
        </Grid>
      </main>
      </div>
          <Footer />

    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async()=>{

    const data= await fetch(`${process.env.URL}/doctor`,{
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