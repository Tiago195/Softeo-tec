import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import contextGlobal from './Context/myContext';
import TableInstallments from './components/TableInstallments';
import ModalAddCliente from './components/ModalAddCliente';
import ModalInfoCliente from './components/ModalInfoCliente';

function App() {
  const { modal, type } = useContext(contextGlobal);
  return (
    <div className='main_container'>
      <ModalInfoCliente />
      <div className={modal.isViewModal ? 'isView' : 'isNotView'}>
        <ModalAddCliente type={type.state} />
      </div>
      <div className={!modal.isViewModal ? 'isView' : 'isNotView'}>
        <SearchBar />
        <TableInstallments />
      </div>
    </div >
  );
}

export default App;
