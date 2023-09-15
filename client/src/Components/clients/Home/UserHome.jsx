import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAxios from "../../../Axios/userAxios.js";
import './UserHome.css'

function UserHome() {
    const [name, setName] = useState("");
    const token = useSelector((store) => store.Client.Token);
    if (token) {
        useEffect(() => {
            if (token) {
                userAxios
                    .get("/getDetails", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        setName(res.data.name);
                    });
            }
        }, [token]);
    } else {
        console.log("no token");
    }

    return (
        <div>
            <div className="p-3">
                <div className="m-5">
                    <div className="d-flex justify-content-center p-3">{name ? <h4 className="dispalyName">Welcome {name}</h4> : ""}</div>
                    <div className="card d-flex justify-content-center">
                        <img
                            src="https://wallpaperaccess.com/full/3909258.jpg"
                            alt="...."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHome;
