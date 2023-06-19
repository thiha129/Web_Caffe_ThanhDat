import React from 'react';
import Slider from "react-slick";
import Carousel from 'react-bootstrap/Carousel'
import "../css/Slider.css";
// import image1 from './../assets/imageort Carousel from 'react-bootstrap/Carousel';s/1.jpg';
// import image2 from './../assets/images/2.jpg';
// import image3 from './../assets/images/3.jpg';

const CarouselContainer = () => {
  var settings = {
    dots: true
  }
  return (
    <div className="container">
      <Slider dots='true'>
        <div>
          <img src="https://arbordaycoffee.org/wp-content/uploads/2020/07/iStock-942313542-e1594671489686.jpg" />
        </div>
        <div>
          <img src="https://www.wallpaperbetter.com/wallpaper/956/942/575/coffee-beans-1080P-wallpaper-middle-size.jpg" />
        </div>
        <div>
          <img src="https://images.wallpaperscraft.com/image/single/coffee_cappuccino_foam_cinnamon_corn_108167_1600x900.jpg" />
        </div>
      </Slider>
    </div>
  )

}

export default CarouselContainer;