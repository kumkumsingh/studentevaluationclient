import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../../service/UserService";
import "./Profile.css";
import "../Index.css"
import Navigation from "./Navigation"

export default function Profile(props) {
  const [userName, setUserName] = useState(props.user.userName);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [profilePicture, setProfilePicture] = useState(
    props.user.profilePicture
  );
  const [enableUpdateBtn, setEnableUpdateBtn] = useState(true);

  const userservice = new UserService();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    userservice
      .editProfile(userName, firstName, lastName, email)
      .then((resp) => {
        props.setUser(resp.user);
      })
      .catch((err) => console.log("Error", err));
  };

  // profilePicture is added to FormData and sent to backend.
  const handleProfilePicSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("profilePicture", e.target[0].files[0]);
    userservice
      .uploadProfilePicture(data)
      // profile picture is uploaded into s3 and s3 location is sent as the response
      .then((resp) => userservice.editProfilePicture(resp.profilePicture))
      .then((resp) => {
        setProfilePicture(resp.user.profilePicture);
        props.setUser(resp.user);
      })
      .catch((err) => console.log("Error", err));
  };
  const enableProfUpdBtn = () => {
    setEnableUpdateBtn(false);
  };
  const deleteProfileImage = () => {
    userservice
      .editProfilePicture("")
      .then((resp) => {
        setProfilePicture(resp.user.profilePicture);
        props.setUser(resp.user);
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <>
      {props.isLoggedIn ? (
        <div className="main-container">
          <Navigation /> 
          <div className="work-container">
            <div className="work-space">
                <form
                className="form-container"
                onSubmit={(e) => handleFormSubmit(e)}
                 >
                <label name="userName"> User Name</label>
                <input
                  type="text"
                  className="input"
                  name="userName"
                  value={userName}
                  onChange={(e) => handleChange(e)}
                ></input>
                <label name="firstName"> First Name</label>
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => handleChange(e)}
                ></input>
                <label name="userName"> Last Name</label>
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => handleChange(e)}
                ></input>
                <label name="email"> Email</label>
                <input
                  type="text"
                  className="input"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                ></input>
                <input type="submit" value="Update"></input>
              </form>
              <form
                className="profile-image-update-form"
                onSubmit={(e) => handleProfilePicSubmit(e)}
               >
                <div className="profile-img-container">
                  <img
                    src="/base.svg"
                    className="profile-holder"
                    alt="profile avatar"
                  ></img>
                  <img
                    src={
                      profilePicture ? `${profilePicture}` : "/Vector.svg"
                    }
                    className="profile-img"
                    alt="vector avatar"
                  ></img>
                  {profilePicture && (
                    <img
                      src="/delete-image.png"
                      className="profile-delete-img"
                      alt="vector delete"
                      onClick={deleteProfileImage}
                    ></img>
                  )}
                </div>
                <div className="text-s orange">
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={enableProfUpdBtn}
                  />
                </div>            
                <input type="submit" value="Update" disabled={enableUpdateBtn}></input>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
