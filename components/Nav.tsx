import Link from 'next/link';
import styles from '../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
        <ul>
            <Link href={'/'}><li>All Doctors</li></Link>
            <Link href={'/booking'}><li>Find My Booking</li></Link>
        </ul>
    </nav>
  );
};

export default Nav;