import React from "react";
import ClientTable from "../../Components/admin/Client/Client";
import Navbar from "../../Components/admin/Navbar/Navbar";

function UserClientTable() {
    return (
        <div className="container w-100">
            <Navbar />
            <ClientTable />
        </div>
    );
}

export default UserClientTable;
