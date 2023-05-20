import { useParams } from 'react-router-dom';
import Select from '../Select/Select';
import { useSelector } from 'react-redux';
import { MdTableBar } from "react-icons/md";
import styles from './Table.module.css'

const Table = () => {
  const { id } = useParams();
  const tables = useSelector(state => state.tables);
  const thisTable = tables.filter((table) => table.id === id);

  return (
    <>
      <div className={styles.tableWrapper}>
        <MdTableBar className={styles.icon} />
        <h3>Table {id}</h3>
      </div>
      {thisTable.map((table) => <Select key={table.id} {...table} />)}


    </>
  )
}

export default Table;