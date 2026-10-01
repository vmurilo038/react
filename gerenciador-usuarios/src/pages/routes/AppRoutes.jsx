import { Routes, Route } from "react-router-dom";

import Products from "../Products/Index";
import Home from "../Home/Index";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/produtos" element={<Home />} />
        </Routes>
    );
}

export default AppRoutes;