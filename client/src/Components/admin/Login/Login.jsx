import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";
import adminAxios from "../../../Axios/adminAxios.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminLogin } from "../../../Redux/AdminAuth.js";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminFormSubmit = (e) => {
        e.preventDefault();
        adminAxios.post("/adminLogin", { email, password }).then((response) => {
            const result = response.data.adminResult;

            if (result.Status) {
                const token = result.token;
                dispatch(AdminLogin({ token: token }));
                navigate("/admin/admin_home");
            } else {
                setErrMsg(result.message);
            }
        });
    };

    return (
        <section class="vh-100">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div className="text-center">
                        <h1>
                            <b>Welcome Admin</b>
                        </h1>
                    </div>
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://themefisher.com/_next/image?url=%2Fblog%2Fadmin-panel-templates.png&w=900&q=75" class="img-fluid" alt="Sample image" />
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={adminFormSubmit}>
                            <div class="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form3Example3"
                                    value={email}
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    class="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                />
                            </div>

                            <div class="form-outline mb-3">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    value={password}
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    class="form-control form-control-lg"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div class="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    class="btn btn-dark "
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    Login
                                </button>
                            </div>
                            {errMsg.length > 0 && <a style={{ color: "red" }}>{errMsg}</a>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
