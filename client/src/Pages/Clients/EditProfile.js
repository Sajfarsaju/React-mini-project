import React from "react";
import EditProfile from "../../Components/clients/EditProfile/EditProfile";
import Header from "../../Components/clients/Header/Header";

function UserEditProfile() {
    return (
        <div className="container mt-3">
            <Header />
            <EditProfile />
        </div>
    );
}

export default UserEditProfile;
