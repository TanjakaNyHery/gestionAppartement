import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Louer from './page/Louer';
import EntreeAdd from './page/EntreeAdd';
import Etat from './page/Etat';
import Login from './page/Login';
import Mvt from './page/Mvt';
import AppartementAdd from './page/AppartementAdd';
import Appartement from './page/Appartement';
import Locataire from './page/Locataire';
import SortieAdd from './page/SortieAdd';

function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer position='top-right' />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='Etat' element={<Etat />} />
          <Route path='Mvt' element={<Mvt />} />
          <Route path='Appartement' element={<Appartement />} />
          <Route path='AppartementAdd' element={<AppartementAdd />} />
          <Route path='AppartementAdd/:numApp' element={<AppartementAdd />} />
          <Route path='Louer' element={<Louer />} />
          <Route path='EntreeAdd' element={<EntreeAdd />} />
          <Route path='EntreeUpdate/:numBonEntree' element={<EntreeAdd />} />
          <Route path='Locataire' element={<Locataire />} />
          <Route path='SortieAdd' element={<SortieAdd />} />
          <Route path='SortieUpdate/:numBonSortie' element={<SortieAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
