import { Routes, Route } from 'react-router-dom';
import AllTables from "../AllTables/AllTables";
import Table from "../Table/Table";
import { useEffect, useState } from 'react';
import { addTables } from '../../redux/ActionsRedux';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../config';
function TablesWrapper() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const fetchTables = () => {
    setIsLoading(true);
    return fetch(API_URL)
      .then(res => res.json())
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchTables()
      .then(tables => {
        setIsLoading(false);
        dispatch(addTables(tables))
      })
      .catch(err => console.error(err));
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
