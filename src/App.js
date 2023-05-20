import { Routes, Route } from 'react-router-dom';
import AllTables from "./components/AllTables/AllTables";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";
import Table from "./components/Table/Table";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from './components/Container/Container';
import { addOptions } from './redux/OptionsRedux'
import TablesWrapper from './components/TablesWrapper/TablesWrapper';

function App() {
 
  return (
    <Container>
      <Navbar />
      <TablesWrapper />
      <Footer />
    </Container>
  );
}

export default App;
