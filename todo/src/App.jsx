import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import AddRole from './Pages/AddRole';
import Register from './Pages/Register';
import AllRoles from './Pages/AllRoles';
import UpdateRole from './Pages/UpdateRole';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddRole />} />
        <Route path="/allRoles" element={<AllRoles />} />
        <Route path="/allRoles/updateRole/:id" element={<UpdateRole />} />
        <Route path="/registration" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
