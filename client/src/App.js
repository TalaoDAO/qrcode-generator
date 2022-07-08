import React, {useEffect} from 'react';
import Home from "./pages/Home";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Voucher from "./pages/Voucher";
import Choice from "./pages/Choice";
import MembershipCard from "./pages/MembershipCard";
import MobileVoucher from "./pages/MobileVoucher";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/');
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/choice" element={<Choice/>}/>
      <Route path="voucher" element={<Voucher/>}/>
      <Route path="membership-card" element={<MembershipCard/>}/>
      <Route path="voucher-mobile" element={<MobileVoucher/>}/>
    </Routes>
  );
}

export default App;
