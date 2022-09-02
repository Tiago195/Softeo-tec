import { useContext } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import contextGlobal from './Context/myContext';
import TableInstallments from './components/TableInstallments';
import ModalAddCliente from './components/ModalAddCliente';

function App() {
  const { modal, type } = useContext(contextGlobal);

  return (
    <div>
      {modal.isViewModal
        ? (<ModalAddCliente type={type.state} />)
        : (<><SearchBar /><TableInstallments /></>)
      }
    </div>
  );
}

export default App;
