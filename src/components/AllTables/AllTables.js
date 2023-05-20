import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import styles from './AllTables.module.css';
import { RotatingLines } from 'react-loader-spinner';

const AllTables = ({ isLoading }) => {
  const tables = useSelector(state => state.tables);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={isLoading}
        />
      </div>
    )
  }

  return (
    <>
      <h1 className={styles.tables}>All tables</h1>
      {tables.map((table) => {
        return (
          <div className={styles.wrapper} key={table.id}>
            <div className={styles.div}>
              <h1 className={styles.table}>Table {table.id}</h1>
              <span className={styles.status}> Status:</span> <p className={styles.textStatus}>{table.status}</p>
            </div>
            <Link to={`/table/${table.id}`}>
              <Button>Show more</Button>
            </Link>
          </div>
        )
      })}
    </>
  )
}
export default AllTables;