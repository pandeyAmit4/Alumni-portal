import React from "react";
import MyPhoto from "../images/me.jpg";

const UserCard = ({ user }) => {
    return (
        <div className="user">
            <div className="userimage">
                <img src={MyPhoto} className="img-user" />
            </div>
            <div className="user-name">{user.username}</div>
            <div className="user-name">{user.college}</div>
            <div className="user-name">{user.fullName}</div>
            <div className="user-name">{user.email}</div>
            <div className="fas fa-envelope"></div>
        </div>
    );
};

export default UserCard;
