import styles from './Container.module.css';

const Container = props => {
  return (
    <div className={styles.div}>{props.children}</div>
  );
};


export default Container;