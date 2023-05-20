import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import styles from './AllTables.module.css';

const AllTables = () => {
  const tables = useSelector(state => state.tables);
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