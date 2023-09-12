import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import TableData from "./components/table/TableData";
// import AddButton from "./components/AddButton";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <TableData />

        {/* <Routes>
          <Route path="addmodal" element={<AddModal />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
