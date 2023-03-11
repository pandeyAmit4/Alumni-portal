import React from "react";
import Nav from "../Nav";
import CreatePost from "../CreatePost";
import PageType from "../PageType";
import VerifyUsers from "../VerifyUsers";
const AdminPage = () => {
    return (
        <div className="feed">
            <div className="left-feed">
                <Nav />
            </div>
            <div className="middle-feed">
                <div className="stick">Admin Only</div>
                <CreatePost isAdmin={true} />
                <PageType pageType={"getadminposts"} />
            </div>
            <div className="right-feed">
                <VerifyUsers />
            </div>
        </div>
    );
};

export default AdminPage;
