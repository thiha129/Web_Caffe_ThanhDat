import React from "react";
import "../css/Chitietbaiviet.css";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import {
  AiOutlineShareAlt,
  AiFillFacebook,
  AiOutlineGooglePlus,
  AiOutlineTwitter,
  AiOutlineMail,
  AiOutlineSend,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions";
import { postsState$ } from "../redux/selectors";
import {
  FacebookShareButton,
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";
const Chitietbaiviet = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  console.log("product chi tiết bài viết", posts);
  React.useEffect(() => {
    dispatch(action.getPosts.getPostsRequest());
  }, [dispatch]);

  console.log(posts);
  const { id } = useParams();
  const shareUrl =
    "http://www.nettruyenpro.com/truyen-tranh/maoyuu-maoh-yuusha/chap-3/202095";
  var found = posts.find(function (element) {
    return element._id === id;
  });
  var baiVietKhac = posts.filter(function (val) {
    return val._id !== id;
  });

  console.log("bài viết còng lại", baiVietKhac);
  if (found === undefined) {
    found = {
      title: "abc",
      updatedAt: "abc",
      attachment: "abc",
      content: "abc",
    };
    console.log(found);
  }
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

  const convertPrice = (e) => {
    return String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const initFacebookSDK = () => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/vi_VN/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };
  React.useEffect(() => {
    initFacebookSDK();
  });
  console.log("chitiet", found);

  //                         </ul>
  //                     </div>
  //                     <div className="bg_main">
  //                         <div className="bg-feature">
  //                             <figure>
  //                                 <img src={found.attachment} />
  //                             </figure>
  //                         </div>
  //                         <br />
  //                         <p style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{found.content}</p>
  //                     </div>
  //                     <div className="sharng_bg">
  //                         <div className="sharing_title">
  //                             <i className="bgshare_icon"><AiOutlineShareAlt /></i>
  //                             SHARING IS CARING
  //                         </div>
  //                         <ul className="bg_social">
  //                             <li>
  //                                 <FacebookShareButton className="s-facebook" url={shareUrl}>
  //                                     <a className="s-facebook">
  //                                         <i ><AiFillFacebook /></i>
  //                                         Facebook</a>
  //                                 </FacebookShareButton>
  //                                 {/* <a src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Flocalhost%3A3000%2Fchitietbaiviet%26id%3D61ad7a21ea7c3a0b8c1ff2f7&layout=button_count&size=small&appId=721913305439216&width=86&height=20" ></a> */}
  //                             </li>
  //                             <li>
  //                                 <a className="s-twitter">
  //                                     <i ><AiOutlineTwitter /></i>
  //                                     Twitter</a>
  //                             </li>
  //                             <li>
  //                                 <a className="s-gmail">
  //                                     <i><AiOutlineGooglePlus /></i>
  //                                     Google+</a>
  //                             </li>
  //                         </ul>
  //                     </div>
  //                     <div className="bg_main" style={{ height: '100% ' }}>
  //                         <div class="fb-comments" data-href="https://unitop.vn/" data-width="780" data-numposts="5"></div>
  //                     </div>
  //                 </div>
  // >>>>>>> main

  const item = baiVietKhac.slice(0, 3).map((val) => (
    <div>
      <Link to={{ pathname: `/chitietbaiviet&id=${val._id}`, data: val }}>
        <article className="mini-article">
          <div className="ginner">
            <figure>
              <a className="#">
                <img src={val.attachment} />
              </a>
            </figure>
            <div className="gadding">
              <h1>{val.title}</h1>

              <div className="detail">
                <div className="time">
                  Ngày đăng: {convertTime(val.updatedAt)}
                </div>
              </div>
            </div>
            <div className=" content">
              <div className=" post-content">
                <p>{val.content}</p>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "black",
                  bottom: -1,
                  right: 3,
                  position: "absolute ",
                }}
              >
                ...
              </p>
            </div>
          </div>
        </article>
      </Link>
      <div className="gline"></div>
    </div>
  ));
  return (
    <>
      <div className="App">
        <div className="blog-frame">
          <div className="p-left">
            <div className="bg-header">
              <h1>{found.title}</h1>
              <ul className="bg_detail">
                <li>Ngày đăng: {convertTime(found.updatedAt)}</li>
              </ul>
            </div>
            <div className="bg_main">
              <div className="bg-feature">
                <figure>
                  <img
                    style={{ width: "100%", height: "400px" }}
                    src={found.attachment}
                  />
                </figure>
              </div>
              <br />
              <p>{found.content}</p>
            </div>
            <div className="sharng_bg">
              <div className="sharing_title">
                <i className="bgshare_icon">
                  <AiOutlineShareAlt />
                </i>
                Chia sẻ bài viết
              </div>
              <ul className="bg_social">
                <li>
                  <FacebookShareButton className="s-facebook" url={shareUrl}>
                    <a className="s-facebook">
                      <i>
                        <AiFillFacebook />
                      </i>
                      Facebook
                    </a>
                  </FacebookShareButton>
                  {/* <a src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Flocalhost%3A3000%2Fchitietbaiviet%26id%3D61ad7a21ea7c3a0b8c1ff2f7&layout=button_count&size=small&appId=721913305439216&width=86&height=20" ></a> */}
                </li>
              </ul>
            </div>
            <div className="bg_main" style={{ height: "100% " }}>
              <div
                class="fb-comments"
                data-href="https://unitop.vn/"
                data-width="780"
                data-numposts="5"
              ></div>
            </div>
          </div>
          {/* bài viết khác */}
          <div className="p-right ">
            <div className="item-body">
              <aside>
                <h1 className="aside-title">Bài viết khác</h1>
                <div className="aside-body ">{item}</div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chitietbaiviet;
