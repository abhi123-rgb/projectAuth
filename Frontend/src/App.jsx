import Signin from "./pages/Signin";
import Signup from "./pages/Signup"
import {BrowserRouter, Navigate, Route, Routes}  from 'react-router-dom';
import AdminDash from "./pages/AdminDash";
import ManagerDash from "./pages/ManagerDash";
import NotFound from './pages/NotFound';
import Unauthorized from "./pages/Unauthorized";

function App() {
  
  return (
    <>
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Navigate to="/signin" replace={true} />} ></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/admindashboard" element={<AdminDash />} />
        <Route path="/managerdashboard" element={<ManagerDash />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/unauthorize" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
