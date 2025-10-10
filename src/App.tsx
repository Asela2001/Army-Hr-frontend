import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router";
import Employee from "./pages/Employee/Employee";
import Dashboard from "./pages/Dashboard";
import Penalty from "./pages/Penalty";
import Master from "./pages/Master/Master";
import MasterData from "./pages/Master/MasterData";
import CreateRecord from "./pages/Master/CreateRecord";
import ViewRecord from "./pages/Master/ViewRecord";
import EditRecord from "./pages/Master/EditRecord";
import EmployeeView from "./pages/Employee/EmployeeView";
import EmployeeSection from "./pages/Employee/EmployeeSection";
import EmployeeEdit from "./pages/Employee/EmployeeEdit";
import EmployeeCreate from "./pages/Employee/EmployeeCreate";

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
        <Route path="/employee/:emp_no" element={<EmployeeView />} />
        <Route path="/employee/:emp_no/:section" element={<EmployeeSection />} />
        <Route path="/employee/:emp_no/edit" element={<EmployeeEdit />} />
        <Route path="/employee/create" element={<EmployeeCreate />} />
        <Route path="/employee/create/:section" element={<EmployeeCreate />} />
      </Routes>
    </div>
  );
};

export default App;
