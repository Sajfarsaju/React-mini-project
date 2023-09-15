import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClientLogout } from "../../../Redux/ClientAuth";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.Client.Token);
    const logout = () => {
        dispatch(ClientLogout());
        navigate("/login");
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand pe-5 ms-3">
                    <b>
                        <i>Trends</i>
                    </b>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                onClick={() => {
                                    navigate("/");
                                }}
                                aria-current="page"
                            >
                                <b style={{cursor:"pointer"}}>Home</b>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                onClick={() => {
                                    navigate("/user_profile");
                                }}
                            >
                                <b style={{cursor:"pointer"}}>Profile</b>
                            </a>
                        </li>
                    </ul>
                    {user ? (
                        <h6
                            className="text-white me-4"
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            {user.name}
                        </h6>
                    ) : null}
                    {user ? (
                        <h6 style={{cursor:"pointer"}} className="text-white me-4" onClick={logout}>
                            Logout
                        </h6>
                    ) : (
                        <h6 style={{cursor:"pointer"}} className="text-white me-4" onClick={logout}>
                            Login
                        </h6>
                    )}
                    {/* <h6 className="text-white me-4" onClick={logout}>
                        Logout
                    </h6> */}
                </div>
            </div>
        </nav>
    );
}

export default Header;
