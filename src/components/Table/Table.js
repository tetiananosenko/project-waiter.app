import { useParams } from 'react-router-dom';
import Actions from '../ReservationForm/ReservationForm';
import { useSelector } from 'react-redux';
import { MdTableBar } from "react-icons/md";
import styles from './Table.module.css'

const Table = () => {
  const { id } = useParams();
  const tables = useSelector(state => state.tables);
  console.log(tables, 'tables')
  const thisTable = tables?.filter((table) => table?.id === id);

  return (
    <>
      <div className={styles.tableWrapper}>
        <MdTableBar className={styles.icon} />
        <h3>Table {id}</h3>
      </div>
      {thisTable.map((table) => <Actions key={table.id} {...table} />)}
    </>
  )
}

export default Table;