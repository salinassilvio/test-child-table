import React, { useState } from "react";
import "./users.css";
import Modal from "@mui/material/Modal";
import { PencilSquare } from "react-bootstrap-icons";
import Box from "@mui/material/Box";
import no from "../../Assets/icons/no.svg";

const Users = ({ user,updatingUser }) => {
  const [modalEditable, setModalEditable] = useState(false);

  const [userLocal,setUserLocal] = useState(user)

  const handleChange = (e) => {
    setUserLocal({
      ...userLocal,
      [e.target.name]: e.target.value,
    });
  };


  const handleModalEditable = () => {
    setModalEditable(!modalEditable);
  };

  return (
    <>
      <div className="user-general-data">
        <div className="user-image-container">
          <p className="user-image">
            {userLocal.name.charAt(0)}
            {userLocal.name.charAt(1)}
          </p>
        </div>
        <p className="user-name">{userLocal.name}</p>
        <p className="user-email">{userLocal.email}</p>
        <p className="user-phone">{userLocal.phone}</p>
        <p className="user-website">{userLocal.website}</p>
        <div className="user-actions">
          <PencilSquare
            style={{ color: "#3FC5DF" }}
            onClick={handleModalEditable}
          />
        </div>
      </div>
      <Modal open={modalEditable}>
        <Box className="modal-box">
          <div className="modal-edit-container">
            <div className="modal-header-edit">
              <h2>Edit User</h2>
              <span onClick={handleModalEditable} className="close-modal">
                <img src={no} alt="close" />
              </span>
            </div>
            <div>
              <input type="text" name="name"  placeholder="User Name" vale={userLocal.name} onChange={handleChange}/>
              <div className="modal-buttons">
                <button className="btn modal-cancel" onClick={handleModalEditable}>Cancel</button>
                <button className="btn modal-save" onClick={() =>{
                  updatingUser(userLocal);
                  handleModalEditable();
                }}>Save</button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Users;
