import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router";
import Employee from "./pages/Employee";
import Dashboard from "./pages/Dashboard";
import Penalty from "./pages/Penalty";
import Master from "./pages/Master";
import MasterData from "./pages/MasterData";
import CreateRecord from "./pages/CreateRecord";
import ViewRecord from "./pages/ViewRecord";
import EditRecord from "./pages/EditRecord";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/master" element={<Master />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/penalty" element={<Penalty />} />
        <Route path="/master/:tableName" element={<MasterData />} />
        <Route path="/master/:tableName/create" element={<CreateRecord />} />
        <Route path="/master/:tableName/view/:id" element={<ViewRecord />} />
        <Route path="/master/:tableName/edit/:id" element={<EditRecord />} />
      </Routes>
    </div>
  );
};

export default App;
