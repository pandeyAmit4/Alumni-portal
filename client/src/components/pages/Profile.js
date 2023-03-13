import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import useForceUpdate from "../../hooks/useForceUpdate";
import { TOKEN_ID } from "../../utils/constants";
import { storeFile } from "../../utils/utilities";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

import Nav from "../Nav";
import PageType from "../PageType";
import AdminPosts from "../admin/AdminPosts";
import MyPhoto from "../../images/me.jpg";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Profile = () => {
  const auth = useAuth();
  const profileFileRef = useRef(null);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [college, setCollege] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [company, setCompany] = useState("");
  const [prevCompany, setPrevCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [prevDesignation, setPrevDesignation] = useState("");
  const [yearsOfExp, setYearsOfExp] = useState(0);
  const [location, setLocation] = useState("");
  const [house, setHouse] = useState("");

  const update = useForceUpdate();

  const updateProfile = () => {
    //need to update all input fields with value from db and then they can edit over that
    setCollege(auth.user.college);
    setGradYear(auth.user.gradYear);
    setCompany(auth.user.company);
    setPrevCompany(auth.user.prevCompany);
    setDesignation(auth.user.designation);
    setPrevDesignation(auth.user.prevDesignation);
    setYearsOfExp(auth.user.yearsOfExp);
    setLocation(auth.user.location);
    setHouse(auth.user.house);
    console.log(auth.user);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const profileImage = await handleSaveDocument(
      "profile",
      Date.now().toString(),
      profileFileRef
    );
    console.log("link:" + profileImage);
    if (!profileImage) {
      console.log("damn");
      return;
    }

    axios({
      method: "post",
      url: "/api/users/uploadprofileimage",
      data: {
        profileImage,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) auth.setUser(result.data.data);
        console.log(auth.user);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit edit profile");
    axios({
      method: "put",
      url: "/api/users/profile",
      data: {
        college,
        designation,
        prevDesignation,
        gradYear,
        prevCompany,
        company,
        yearsOfExp,
        location,
        house,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        // console.log("result");
        // console.log(result.data);
        // console.log(auth.user);
        if (result.data.success) {
          auth.setUser(result.data.data);
          toast.success("Profile Updated");
        }
        toast.error("Profile not Updated");
        console.log(auth.user);
      })
      .catch((err) => console.log(err));
  };
  const handleSaveDocument = async (folderName, fileName, ref) => {
    if (!ref || !ref.current) return;
    console.log(ref.current);
    const file = ref.current.files[0];
    try {
      const url = await storeFile(folderName, fileName, file);
      return url.toString();
    } catch (err) {
      console.log("oh no");
      return "";
    }
  };
  return (
    <div className="feed">
      <Toaster position="center-top" reverseOrder={false} />
      <div className="left-feed">
        <Nav />
      </div>
      <div className="middle-feed">
        <div className="stick">Profile</div>
        <div className="profile">
          <div className="profile-top">
            <div className="profile-left">
              {auth.user.profileImage != "" ? (
                <img src={auth.user.profileImage} className="img-user" />
              ) : (
                <img src={MyPhoto} className="img-user" />
              )}

              <form>
                Profile Picture Upload
                <br />
                <input
                  ref={profileFileRef}
                  onChange={update}
                  type="file"
                  name="file"
                  accept="file/*"
                />
                <br />
                <button
                  className="btn"
                  type="submit"
                  onClick={handleUploadImage}
                >
                  <i className="fas fa-edit"> Submit New Pic</i>
                </button>
              </form>
            </div>
            <div className="profile-right">
              <button
                style={{ marginTop: "1rem" }}
                className="btn btn-primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Edit Profile
              </button>
              <h1>{auth.user.username}</h1>
              <h3>College: {auth.user.college}</h3>
              <h3>Years of Experience:{auth.user.yearsOfExp}</h3>
            </div>
          </div>
        </div>

        <div className="profile-down">
          <div style={{ fontWeight: "bold", fontSize: "2rem" }}>Your Posts</div>
          <PageType userid={auth.user.username} pageType={"getmyposts"} />
        </div>
      </div>

      <div className="right-feed">
        <AdminPosts />
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <form className="popupForm">
          <h3>Update Profile</h3>
          <div className="form-group">
            <input
              style={{
                margin: "1rem",
                border: "1px dotted black",
                padding: "5px",
                borderRadius: "5px",
                minWidth: "80%",
              }}
              className="form-control"
              placeholder="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={auth.user.location === null ? "" : auth.user.location}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="College"
              type="text"
              onChange={(e) => setCollege(e.target.value)}
              value={auth.user.college == null ? "" : auth.user.college}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Graduation Year"
              type="text"
              onChange={(e) => setGradYear(e.target.value)}
              value={auth.user.gradYear}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="House Name"
              type="text"
              onChange={(e) => setHouse(e.target.value)}
              value={auth.user.house}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Current Company"
              type="text"
              onChange={(e) => setCompany(e.target.value)}
              value={auth.user.company}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Previous Company"
              type="text"
              onChange={(e) => setPrevCompany(e.target.value)}
              value={auth.user.prevCompany}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Current Designation"
              type="text"
              onChange={(e) => setDesignation(e.target.value)}
              value={auth.user.designation}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Previous Designation"
              type="text"
              onChange={(e) => setPrevDesignation(e.target.value)}
              value={auth.user.prevDesignation}
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Years of work experience"
              type="number"
              onChange={(e) => setYearsOfExp(e.target.value)}
              value={auth.user.yearsOfExp}
            ></input>
          </div>
          <button className="btn" type="submit" onClick={handleSubmit}>
            Save Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
