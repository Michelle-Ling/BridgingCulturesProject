import React, { Component, lazy, Suspense } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/BannerImages/banner1.jpg";
import banner2 from "../../assets/BannerImages/banner2.jpg";
import banner3 from "../../assets/BannerImages/banner3.jpg";
import banner4 from "../../assets/BannerImages/banner4.jpg";
import banner5 from "../../assets/BannerImages/banner5.jpg";
import banner6 from "../../assets/BannerImages/banner6.jpg";
import banner7 from "../../assets/BannerImages/banner7.jpg";
import banner8 from "../../assets/BannerImages/banner8.jpg";
import banner9 from "../../assets/BannerImages/banner9.jpg";
import banner10 from "../../assets/BannerImages/banner10.jpg";
import banner11 from "../../assets/BannerImages/banner11.jpg";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    // this.state = {
    //   dropdownOpen: false,
    //   radioSelected: 2,
    // };
  }
  
  // toggle() {
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen,
  //   });
  // }

  // onRadioBtnClick(radioSelected) {
  //   this.setState({
  //     radioSelected: radioSelected,
  //   });
  // }

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    // return (
    //   <div className="animated fadeIn">
    //     Dash here....
    //   </div>
    // );
    return ( 
    <Carousel arrows infiniteLoop>
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
      <div>
        <img src={banner11} />
      </div>
    </Carousel>
    );
  }
}

export default Dashboard;
