import {Grid} from '@mui/material';
import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import {useState} from 'react';
import Banner from '../components/Banner';
import DocListingCard from '../components/DocListingCard';
import FilterInput from '../components/FilterInput';
import Footer from '../components/Footer';
import Drawer from '../components/ResponsiveDrawer';
import {DoctorInterface} from '../interfaces/doctor.interface';
import styles from '../styles/Home.module.css';

const Home:NextPage<{doctors: DoctorInterface[]}> = (
    {doctors}:{doctors: DoctorInterface[]}) => {
  const [query, setQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  /**
   *  Handle the input changes and filter the doctors by search term
   * @param {DoctorInterface[]} doctors - doctors from getStaticProps
   * @param {string} query - search term
   */
  function handleChange(doctors: DoctorInterface[], query:string) {
    const filtered = query ===''? doctors : doctors.filter((doctor)=>{
      return (
        doctor.address.district
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
      doctor.name
          .toLowerCase()
          .includes(query.trim().toLowerCase()) );
    });
    setQuery(query);
    setFilteredDoctors(filtered);
  }

  return (
    <div >
      <Head>
        <title>NeckTie Doctors Booking</title>
        <meta name="Assessment" content="challenge accepted" />
        <link rel="icon" href="/public/tie.png" />
      </Head>

      <Banner/>
      <div className={styles.container}>
        <Drawer/>
        <main className={styles.main}>
          <FilterInput
            label={'Search by Name or District'}
            list={doctors} query={query}
            handleChange={handleChange}/>
          <Grid container spacing={2}>

            {filteredDoctors.map( (doctor, idx)=>(
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

export const getStaticProps: GetStaticProps = async ()=>{
  const data= await fetch(`${process.env.URL}/doctor`, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY!,
    },
  });
  const results: DoctorInterface[] = await data.json();

  return {
    props: {
      doctors: results,
    },
  };
};
