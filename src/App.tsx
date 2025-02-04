import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css'
import Login from "./pages/login";
import Signup from "./pages/signup";
import { ToastContainer } from 'react-toastify';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import CreatePage from "./pages/create";
import HomePage from "./pages/homepage";
import EditPage from "./pages/edit";

function App() {

  return (
    <Router>
      <ToastContainer  />
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="edit/:id" element={<EditPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path="/create" element={<CreatePage  />}/>
      </Routes>
    </Router>
  )
}

export default App
