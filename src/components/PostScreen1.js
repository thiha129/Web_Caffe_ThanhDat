import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "../css/PostScreen1.css";
import Dropdown from "./Dropdown";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions";
import { postsState$ } from "../redux/selectors";
import Footer from "./Footer";
const data = [
  {
    attachment: "",
    updatedAt: "",
    title: "",
    updatedAt: "",
  },
];
function PostScreen1({ navigation }) {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  console.log("POSTsS", posts);
  React.useEffect(() => {
    dispatch(action.getPosts.getPostsRequest());
  }, [dispatch]);
  const convertTime = (value) => {
    var date = new Date(value);
    var d;
    var m;
    var minus;
    var h;

    parseInt(date.getMinutes()) < 10
      ? (minus = "0" + date.getMinutes())
      : (minus = date.getMinutes());
    parseInt(date.getHours()) < 10
      ? (h = "0" + date.getHours())
      : (h = date.getHours());

    parseInt(date.getDate()) < 10
      ? (d = "0" + date.getDate())
      : (d = date.getDate());
    parseInt(date.getMonth()) < 9
      ? (m = "0" + (date.getMonth() + 1))
      : (m = date.getMonth() + 1);

    return (
      h + "h:" + minus + "'" + " " + d + "-" + m + "-" + date.getFullYear()
    );
  };

  const list = posts.map((post) => (
    <div className="Item ">
      <img className="pixer img-post" src={post.attachment}></img>

      <div className="title">
        <p
          className="header-title"
          style={{ margin: "5px 0", fontSize: "20px", fontWeight: "bold" }}
        >
          {post.title}
        </p>
        <p style={{ margin: "10px 0", fontSize: "14px" }}>
          <span className="date">Ngày đăng: {convertTime(post.updatedAt)}</span>
        </p>
      </div>
      <div
        className="content context-post "
        style={{ textAlign: "justify", lineHeight: 1.7, letterSpacing: 0.8 }}
      >
        <p>{post.content}</p>
      </div>
      <div className="bottom-row">
        <div className="cleft button1 ">
          <Link to={{ pathname: `/chitietbaiviet&id=${post._id}`, data: post }}>
            <button className="button">
              <b>Đọc thêm »</b>
            </button>
          </Link>
        </div>
        <div className="cright">
          <p>
            <span className="cmt-btn">
              <b>Bình luận  </b> <span className="person-cmt">2</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="App">
        <div className="body_post">
          <div className="header_post">Bài viết</div>
          <div className="list_post">{list}</div>
        </div>
      </div>
    </>
  );
}

export default PostScreen1;
