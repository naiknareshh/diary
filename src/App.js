import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import Tasks from "./Pages/Tasks/Tasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
