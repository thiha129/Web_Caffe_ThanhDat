import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <>
      <li className="cards__item" style={{ width: "25%" }}>
        <Link
          className="cards__item__link"
          to={{
            pathname: `/chitietbaiviet&id=${props.post._id}`,
          }}
        >
          <figure className="cards__item__pic-wrap" data-category={"Xem them"}>
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={props.post.attachment}
            />
          </figure>

          <div className="cards__item__info">
            <h5 className="cards__item__title">{props.post.title}</h5>
            <h5 className="cards__item__text">{props.post.content}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
