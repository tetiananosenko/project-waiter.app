import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h5 className={styles.nav}>&copy;{new Date().getFullYear()}</h5>
      <h5 className={styles.nav}>All rights reserved</h5>
    </div>
  )
}

export default Footer;
