import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MyPhoto from "../images/me.jpg";
import CreateComment from "./CreateComment";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
const Comments = ({ post_id, owner }) => {
    const [comments, setComments] = useState([]);
    const auth = useAuth();

    const addComment = (x) => {
        setComments([...comments, x]);
    };
    useEffect(() => {
        axios({
            method: "post",
            url: "/api/home/getcomments",
            data: {
                postid: post_id,
            },
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                console.log("pls work");
                if (result.data.success) {
                    setComments(...comments, result.data.data);
                    // console.log(comments)
                } else {
                    console.log("ayo");
                }
            })
            .catch((err) => {
                console.log("err:");
                console.log(err);
            });

        // eslint-disable-next-line
    }, []);

    return (
      <div>
        <CreateComment post_id={post_id} addComment={addComment} />
        {comments.map((comment) => (
          <div className="comment">
            <div className="comment-left">
              {comment && comment.owner && comment.owner.profileImage !== "" ? (
                <img src={comment.owner.profileImage} className="img-user" />
              ) : (
                <img src={MyPhoto} className="img-user" />
              )}
            </div>

            <div className="comment-right">
              {/* <b>{comment.owner.username}</b> */}
              <div>{comment.answer}</div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Comments;
