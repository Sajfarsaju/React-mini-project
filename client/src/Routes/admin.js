import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import UserClientTable from "../Pages/Admin/Client";
import Edit from "../Pages/Admin/Edit";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";

function AdminRoute() {
    const IsAdminAuth = useSelector((state) => state.Admin.Token);
    return (
        <div>
            <Routes>
                <Route path="/" element={IsAdminAuth ? <AdminHome /> : <Login />} />
                <Route path="/admin_home" element={IsAdminAuth ? <AdminHome /> : <Login />} />
                <Route path="/client_table" element={IsAdminAuth ? <UserClientTable /> : <Login />} />
                <Route path="/user_edit/:id" element={IsAdminAuth ? <Edit /> : <Login />} />
            </Routes>
        </div>
    );
}

export default AdminRoute;
