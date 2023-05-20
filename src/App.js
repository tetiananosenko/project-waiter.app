import { Routes, Route } from 'react-router-dom';
import AllTables from "./components/AllTables/AllTables";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";
import Table from "./components/Table/Table";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from './components/Container/Container';

function App() {
  const dispatch = useDispatch();

  const fetchTables = () => {
    return fetch('http://localhost:3131/api/tables')
      .then(res => res.json())
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTables()
      .then(tables => {
        dispatch({ type: 'ADD_TABLES', payload: tables })
      })
  }, [dispatch]);

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllTables />} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
