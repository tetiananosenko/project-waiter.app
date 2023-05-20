import { Routes, Route } from 'react-router-dom';
import AllTables from "./components/AllTables/AllTables";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";
import Table from "./components/Table/Table";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from './components/Container/Container';
import { addTables } from './redux/ActionsRedux';
import { addOptions } from './redux/OptionsRedux'

function App() {
  const dispatch = useDispatch();

  const fetchTables = () => {
    return fetch('http://localhost:3131/api/tables')
      .then(res => res.json())
      .catch(error => console.log(error))
  }
  const fetchOptions = () => {
    return fetch('http://localhost:3131/api/options')
      .then(res => res.json())
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTables()
      .then(tables => {
        dispatch(addTables(tables))
      })
      .catch(err => console.error(err));
    fetchOptions()
      .then(options => {
        dispatch(addOptions(options))
      })
      .catch(err => console.error(err));
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
