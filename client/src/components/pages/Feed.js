import React from "react";
import Nav from "../Nav";
import CreatePost from "../CreatePost";
import PageType from "../PageType";
import { useAuth } from "../../context/AuthContext";
import AdminPosts from "../admin/AdminPosts";

const Feed = () => {
    const auth = useAuth();
    let userName = ""
    if (auth && auth.user && auth.user.username) {
      userName = auth.user.username;
    }
    return (
        <div className="feed">
            <div className="left-feed">
                <Nav />
            </div>

            <div className="middle-feed">
                <div className="stick">Feed</div>
                <CreatePost isAdmin={false} />
                <PageType pageType={"getposts"} userid={userName}/>
            </div>
            <div className="right-feed">
                <AdminPosts />
            </div>
        </div>
    );
};

export default Feed;
