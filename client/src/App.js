import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./Routes/admin";
import UserRoute from "./Routes/user";


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/*" element={<UserRoute />} />
                    <Route path="/admin/*" element={<AdminRoute />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
