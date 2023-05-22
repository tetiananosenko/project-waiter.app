import { useParams } from 'react-router-dom';
import ReservationForm from '../ReservationForm/ReservationForm';
import { useSelector } from 'react-redux';
import { MdTableBar } from "react-icons/md";
import styles from './Table.module.css'
import { useNavigate } from 'react-router-dom';


const Table = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const tables = useSelector(state => state.tables);
  const table = tables.find((table) => table?.id === id);

  if (!table) {
    navigate('/');
    return
  }
  return (
    <>
      <div className={styles.tableWrapper}>
        <MdTableBar className={styles.icon} />
        <h3>Table {id}</h3>
      </div>
      <ReservationForm key={table.id} {...table} />
    </>
  )
}

export default Table;