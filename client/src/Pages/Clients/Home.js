import React from "react";
import UserHome from "../../Components/clients/Home/UserHome.jsx";
import Header from "../../Components/clients/Header/Header";

function Home() {
    return (
        <div className="container mt-3">
            <Header />
            <UserHome />
        </div>
    );
}

export default Home;
