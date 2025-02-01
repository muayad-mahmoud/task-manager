import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Login from "./pages/login";
import Signup from "./pages/signup";
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <Router>
      <ToastContainer  />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup  />} />
      </Routes>
    </Router>
  )
}

export default App
