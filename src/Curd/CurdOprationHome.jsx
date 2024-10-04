import React, { useState } from "react";
import './CurdOpration.css'
import CurdEditChanges from "./EditChanges";

const CurdOperationHome = () => {
    const [state, setState] = useState({
        id: 0,
        userName: "",
        age: "",

        userNameError: "",
        ageError: "",

        UserData: [],
        updatedUserData: [],

        editModal: false,
    });

    console.log("CURD", state.UserData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value, userNameError: "", ageError: "" }));
    }

    const handleSubmit = () => {
        const { userName, age, id } = state;
        if (!userName) {
            setState(prevState => ({ ...prevState, userNameError: "Please Enter User Name" }));
            return;
        } else if (!age) {
            setState(prevState => ({ ...prevState, ageError: "Please Enter Age" }));
            return;
        }
        let newUser = {
            "id": id + 1,
            "userName": userName,
            "age": age
        }
        setState(prevState => ({ ...prevState, UserData: [...prevState.UserData, newUser], userName: "", age: "", id: id + 1 }));
    }

    const handleDelete = (index) => {
        const deleteUserData = state.UserData.filter((_, i) => i !== index);
        setState(prevState => ({ ...prevState, UserData: deleteUserData }));
    }

    const handleEdit = (row) => {
        setState(prevState => ({ ...prevState, updatedUserData: [row], editModal: true }))
    }

    const handleClose = () => {
        setState(prevState => ({ ...prevState, editModal: false }))
    }

    const handleUpdateContact = (newData) => {
        console.log("newData", newData);
        setState(prevState => {
            const updatedUserData = prevState.UserData.map(user => {
                if (user.id === newData.id) {
                    return { ...user, ...newData };
                }
                return user;
            });
            return { ...prevState, UserData: updatedUserData };
        });
    }


    return (
        <div className="curd__Example">
            <div className="card">
                <div className="card-body text-dark card_bg_Color">
                    <h6 className="text-center text-uppercase">Curd Operation Example With (Insert,Update && Delete)</h6>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-lg-12">
                    <div class="card creation_Card">
                        <div class="card-body">
                            <div className="row col-lg-12">
                                <div>
                                    <h6>User Name : <span className="text-danger">{state.userNameError}</span></h6>
                                    <input type="text" name="userName" value={state.userName} className="form-control" onChange={handleChange} placeholder="Enter User Name" />
                                </div>
                                <div className="mt-2">
                                    <h6>Age : <span className="text-danger">{state.ageError}</span></h6>
                                    <input type="number" name="age" value={state.age} className="form-control" onChange={handleChange} placeholder="Enter Age" />
                                </div>
                                <div className="text-center">
                                    <button className="btn mt-3 btn submit__button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <table class="table table-bordered text-center">
                    <thead className="table__Column">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.UserData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleEdit(user)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                state.editModal && (
                    <CurdEditChanges
                        updatedUserData={state.updatedUserData}
                        show={state.editModal}
                        handleClose={handleClose}
                        handleUpdateContact={handleUpdateContact}
                    />
                )
            }
        </div>
    )
}
export default CurdOperationHome;
