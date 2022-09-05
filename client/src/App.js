import React, {useEffect} from 'react';
import Home from "./pages/Home";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Voucher from "./pages/Voucher";
import Choice from "./pages/Choice";
import MembershipCard from "./pages/MembershipCard";
import MobileVoucher from "./pages/MobileVoucher";
import Vouchers from "./pages/Vouchers";
import AragoPass from "./pages/AragoPass";
import LoyaltyCard from "./pages/LoyaltyCard";
import MembershipCardMobile from "./pages/MembershipCardMobile";

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
      <Route path="membership" element={<MembershipCard/>}/>
      <Route path="voucher_mobile" element={<MobileVoucher/>}/>
      <Route path="vouchers" element={<Vouchers/>}/>
      <Route path="arago_pass" element={<AragoPass/>}/>
      <Route path="loyaltycard" element={<LoyaltyCard/>}/>
      <Route path="membershipcard_mobile" element={<MembershipCardMobile/>}/>
    </Routes>
  );
}

export default App;
