import React, { useState } from "react";
import Navbar from "../../Components/admin/Navbar/Navbar";
import Dashboard from "../../Components/admin/Dashboard/Dashboard";

function AdminHome() {
    return (
        <div className="container w-100">
            <Navbar />
            <Dashboard />
        </div>
    );
}
export default AdminHome;
