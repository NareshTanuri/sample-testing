import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import './CurdOpration.css';

const CurdEditChanges = ({ handleClose, show, updatedUserData, handleUpdateContact }) => {
    const [state, setState] = useState({
        id: "",
        userName: "",
        age: "",
        userNameError: "",
        ageError: "",
    });

    useEffect(() => {
        if (updatedUserData && Object.keys(updatedUserData).length > 0) {
            console.log("Updated User Data Prop:", updatedUserData, updatedUserData[0]?.userName);
            setState(prevState => ({
                ...prevState,
                id: updatedUserData[0]?.id || "",
                userName: updatedUserData[0]?.userName || "",
                age: updatedUserData[0]?.age || ""
            }));
        }
    }, [updatedUserData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
            userNameError: "",
            ageError: ""
        }));
    }

    const handleUpdateSubmitt = () => {
        const { userName, age, id } = state;
        let newUser = {
            "id": id,
            "userName": userName,
            "age": age
        }
        console.log("newUser", newUser);
        handleUpdateContact(newUser);
        setTimeout(() => {
            handleClose();
        }, 1500);
    }
    return (
        <>
            {show && (
                <Modal show={show} onHide={handleClose} dialogClassName="modal-right" size="md">
                    <Modal.Header className="modal__Header">
                        <Modal.Title id="example-modal-sizes-title-lg">Edit</Modal.Title>
                        <div onClick={handleClose} className="close__btn">X</div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mt-2">
                            <div className="col-lg-12">
                                <div className="row col-lg-12">
                                    <div>
                                        <h6>User Name : <span className="text-danger">{state.userNameError}</span></h6>
                                        <input
                                            type="text"
                                            name="userName"
                                            value={state.userName}
                                            className="form-control"
                                            onChange={handleChange}
                                            placeholder="Update User Name"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <h6>Age : <span className="text-danger">{state.ageError}</span></h6>
                                        <input
                                            type="number"
                                            name="age"
                                            value={state.age}
                                            className="form-control"
                                            onChange={handleChange}
                                            placeholder="Update Age"
                                        />
                                    </div>
                                    <div className="text-center mt-3">
                                        <button className="btn submit__button" onClick={handleUpdateSubmitt}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default CurdEditChanges;
