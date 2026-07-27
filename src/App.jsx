import { Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/menu" element={<Menu />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ManagerDashboard />} />
    </Routes>
  );
}

export default App;