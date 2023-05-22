import { Routes, Route } from 'react-router-dom';
import AllTables from "../AllTables/AllTables";
import Table from "../Table/Table";
import { useEffect, useState } from 'react';
import { fetchTables } from '../../redux/TablesRedux';
import { useDispatch } from 'react-redux';

function TablesWrapper() {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTables(setIsLoading));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AllTables isLoading={isLoading} />} />
      <Route path="/table/:id" element={<Table />} />
      <Route path="*" element={<AllTables />} />
    </Routes>
  );
}

export default TablesWrapper;
