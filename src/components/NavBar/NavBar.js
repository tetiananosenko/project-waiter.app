import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


const Navbar = () => {
  return (
    <div className={styles.navWrapper}>
      <h1 className={styles.logo}>Waiter.app</h1>
      <Link to='/' className={styles.navLink}>Home</Link>
    </div>
  )
}

export default Navbar;