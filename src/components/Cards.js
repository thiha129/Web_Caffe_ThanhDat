import React from "react";
import "../css/Cards.css";
import CardItem from "./CardItem";

import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions";
import { postsState$ } from "../redux/selectors";

function Cards() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    dispatch(action.getPosts.getPostsRequest());
  }, [dispatch]);

  React.useEffect(() => {
    if (posts != undefined) setData(posts)
  }, [posts]);

  return (
    <div className="cards" style={{ textAlign: 'center' }}>
      <h1 style={{ borderBottom: '1px black solid', paddingBottom: '4px', marginBottom: '20px' }}>Bài viết nổi bật</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {posts.slice(0, 3).map((post) => (
              <CardItem post={post} />
            ))}
          </ul>
          <ul className="cards__items">
          </ul>
        </div>
      </div>
    </div >
  );
}

export default Cards;
