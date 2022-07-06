import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Voucher from "./pages/Voucher";
import Choice from "./pages/Choice";
import MembershipCard from "./pages/MembershipCard";
import MobileVoucher from "./pages/MobileVoucher";

function App() {
    const token = localStorage.getItem('token')
    if (!token) {
      return <Home/>
    } else {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/choice" element={<Choice/>}/>
            <Route path="voucher" element={<Voucher/>}/>
            <Route path="membership-card" element={<MembershipCard/>}/>
            <Route path="voucher-mobile" element={<MobileVoucher/>}/>
          </Routes>
        </Router>
      );
    }
}

export default App;
