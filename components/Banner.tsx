import {Typography} from '@mui/material';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Banner = () => {
  return (
      <header className={styles.header}>
        <Link className={styles.link}href='/'>
        <Typography variant='h2'> Welcome to NeckTie Insurance</Typography>
        <Typography variant='body1'> helping you to find the right doctor.</Typography>
    </Link>

    </header>
  );
};

export default Banner;