import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../../../Redux/AdminAuth";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(AdminLogout());
        navigate("/admin");
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ps-4 pe-4">
            <div class="container-fluid">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand">
                        <b>Admin Panel</b>
                    </a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a
                                class="nav-link active"
                                onClick={() => {
                                    navigate("/admin/admin_home");
                                }}
                                aria-current="page"
                            >
                                <i style={{cursor:"pointer"}}>Home</i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active"  onClick={() => {
                                
                                navigate("/admin/client_table");
                            }}>
                                <i style={{cursor:"pointer"}}>Clients</i>
                            </a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <button 
                            class="btn btn-dark"
                            onClick={logout}
                            type="submit"
                        >
                            Logout!
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
