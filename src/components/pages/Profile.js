import React from "react";
import "../../App.css";

import Footer from "../Footer";
import ProfileScreen1 from "../ProfileScreen1";
function Profile() {
  return (
    <div style={{
      backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,1)), url('./backGroundDangKy.png')",
    }} >
      <ProfileScreen1 />
      <Footer />
    </div>
  );
}

export default Profile;
