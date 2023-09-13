import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import TableData from "./components/table/TableData";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <TableData />
      </BrowserRouter>
    </div>
  );
}

export default App;
