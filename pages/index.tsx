import {Grid} from '@mui/material';
import type {GetStaticProps} from 'next';
import Head from 'next/head';
import DocListingCard from '../components/DocListingCard';
import {DoctorInterface} from '../interface/doctor.interface';
import styles from '../styles/Home.module.css';


const Home= ({results}:{results: DoctorInterface[]}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NeckTie Doctors Booking</title>
        <meta name="Assessment" content="challenge accepted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container spacing={2}>
        {results.map( (result, idx)=>(
            <DocListingCard key={idx} {...result}  />
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
      results: results
    }
  };
};