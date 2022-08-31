import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "./components/SearchBar";
import contextGlobal from "./Context/myContext";
import TableInstallments from "./components/TableInstallments";

function App() {
  const store = useContext(contextGlobal);
  // console.log(store);
  return (
    <div>
      <SearchBar />
      <TableInstallments />
    </div>
  );
}

export default App;
