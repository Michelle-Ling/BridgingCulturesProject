// Packages to be imported
import React, { Component, lazy, Suspense } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/BannerImages/banner1.png";
import banner2 from "../assets/BannerImages/banner2.png";
import banner3 from "../assets/BannerImages/banner3.png";
import banner4 from "../assets/BannerImages/banner4.png";
import banner5 from "../assets/BannerImages/banner5.png";
import banner6 from "../assets/BannerImages/banner6.png";
import banner7 from "../assets/BannerImages/banner7.png";
import banner8 from "../assets/BannerImages/banner8.png";
import banner9 from "../assets/BannerImages/banner9.png";
import banner10 from "../assets/BannerImages/banner10.png";
// Gallery class for collective cultural images
class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pagetitle = {
      fontFamily: "Gayathri",
      backgroundColor: "#F8F8F8",
      padding: "50px",
      textAlign: "center"
    };
    return (
      <ul>
        <div style={pagetitle} className="rounded">
          <h1>Gallery</h1>
          <p>Capturing the best moments of life.</p>
        </div>
        <p></p>
        <div>
          <Carousel autoPlay arrows infiniteLoop>
            <div>
              <img src={banner1} />
            </div>
            <div>
              <img src={banner2} />
            </div>
            <div>
              <img src={banner3} />
            </div>
            <div>
              <img src={banner4} />
            </div>
            <div>
              <img src={banner5} />
            </div>
            <div>
              <img src={banner6} />
            </div>
            <div>
              <img src={banner7} />
            </div>
            <div>
              <img src={banner8} />
            </div>
            <div>
              <img src={banner9} />
            </div>
            <div>
              <img src={banner10} />
            </div>
          </Carousel>
        </div>
      </ul>
    );
  }
}
export default Gallery;
