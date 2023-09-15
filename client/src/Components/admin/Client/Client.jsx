import React, { useEffect, useState } from "react";
import adminAxios from "../../../Axios/adminAxios.js";
import Swal from "sweetalert2";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function ClientTable() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
    const navigate = useNavigate();

    const token = useSelector((store) => store.Admin.Token);
    console.log(token, "token get user");

    const [userData, setUserData] = useState([]);
    const [deleteUser, setDeleteUser] = useState(0);
    const [SearchInput, setSearchInput] = useState("");
    useEffect(() => {
        adminAxios
            .get("/getUsers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.result);
                setUserData(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DeleteUser = (id) => {
        adminAxios
            .post(
                "/delete_user",
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
               
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                        setUserData(response.data.result);
                    
            
            })
            .catch((error) => {
                Toast.fire(error.message);
                console.log(error);
            });
    };
    const handleChange = (event) => {
        setSearchInput(event.target.value);
        setDeleteUser(0);
        if (SearchInput) {
            let updateUser = userData.filter((item) => item.name.toLowerCase().indexOf(SearchInput.toLowerCase()) !== -1);
            setUserData(updateUser);
        } else {
            setDeleteUser(1);
        }
    };

    return (
        <div className="">
            <div className="m-5">
                <nav className="navbar bg-light">
                    <div className="container-fluid">
                        <form className="d-flex flex-fill" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                value={SearchInput}
                                onChange={handleChange}
                                aria-label="Search"
                            />
                            <button className="btn btn-dark" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((obj, index) => {
                        console.log(obj._id, 1111);
                        return (
                            <tr key={obj._id}>
                                <th key={obj._id} scope="row">
                                    {index + 1}
                                </th>
                                <td key={obj._id}>{obj.name}</td>
                                <td key={obj._id}>{obj.email}</td>
                                <td key={obj._id}>{obj.phone}</td>
                                <td key={obj._id}>
                                    <button
                                        onClick={() => navigate(`/admin/user_edit/${obj._id}`)}
                                        className="btn btn-dark btn-sm"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td key={obj.id}>
                                    <button onClick={() => DeleteUser(obj._id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default ClientTable;
