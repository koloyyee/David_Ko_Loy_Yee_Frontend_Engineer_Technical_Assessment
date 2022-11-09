import {Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import styles from '../styles/Header.module.css';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(()=> {
        console.error('no such page');
    },50000);
    router.replace('/');
  });

  return (
    <Typography className={styles.header }variant='h1'> We are heading back home! </Typography>
  );
}