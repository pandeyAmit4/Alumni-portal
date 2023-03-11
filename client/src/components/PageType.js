import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Post from "./Post";
import { TOKEN_ID } from "../utils/constants";
const PageType = ({ pageType, userid }) => {
    console.log("pls worrrrrrrrrrrrrrrrrrrk", userid);
    const auth = useAuth();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem(TOKEN_ID);

    useEffect(() => {
        setUser(auth.user);
    }, []);
    useEffect(() => {
        const fetchPageType = () => {
            console.log("in effect");
            console.log(pageType + "!!!!!");
            axios({
                method: "get",
                url: `/api/home/${pageType}`,
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
                },
            }).then((result) => {
                if (pageType == "getpost") {
                    if (result.data.success) {
                        console.log(posts);
                        let x = [];
                        x.push(result.data.data);
                        setPosts(x);
                    } else {
                    }
                } else {
                    if (result.data.success) {
                        console.log(posts);
                        setPosts(...posts, result.data.data);
                        console.log("succccccccccccccc");
                    } else {
                    }
                }
            });
        };
        if (pageType) {
            fetchPageType();
        }
    }, [pageType]);
    useEffect(() => {
        console.log("in other post use effect");
        const fetchOthersPosts = () => {
            axios({
                method: "get",
                url: `/api/home/getothersposts/${userid}`,
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
                },
            })
                .then((result) => {
                    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
                    if (result.data.success) {
                        console.log(posts);
                        setPosts(...posts, result.data.data);
                        console.log("whichihihihihisuccccccccccccccc");
                    } else {
                        console.log("no succ failed");
                    }
                })
                .catch((err) => console.log(err));
        };
        console.log("++++++++++++userid", userid);
        if (userid) {
            console.log("----------userid if present", userid);
            fetchOthersPosts();
        }
    }, []);
    const deletePost = (x) => {
        const newposts = posts.filter((post) => post._id !== x);
        console.log("deleted");
        console.log(x);
        setPosts(newposts);
    };
    const editPostBookmark = (x) => {
        let postid = x._id;
        let newposts = [];
        for (let i = 0; i < posts.length; i++) {
            console.log(posts[i]);
            if (posts[i]._id === postid) {
                newposts.push(x);
            } else {
                newposts.push(posts[i]);
            }
        }
        setPosts(newposts);
    };
    const editPostLike = (x) => {
        let postid = x._id;
        let newposts = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i]._id === postid) {
                newposts.push(x);
            } else {
                newposts.push(posts[i]);
            }
        }
        setPosts(newposts);
    };
    return (
        <div>
            {posts.map((post) => (
                <Post
                    imageLink={post.imageLink}
                    email={post.email}
                    question={post.question}
                    post_id={post._id}
                    deletePost={deletePost}
                    bookmarkedArray={post.bookmarked}
                    likedArray={post.liked}
                    editPostBookmark={editPostBookmark}
                    editPostLike={editPostLike}
                    owner={post.owner}
                    createdAt={post.createdAt}
                    currentDate={post.currentDate}
                />
            ))}
        </div>
    );
};

export default PageType;
