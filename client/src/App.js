import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Voucher from "./pages/Voucher";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="voucher" element={<Voucher/>}/>
            </Routes>
        </Router>
    );
}

export default App;
