import React from "react";
import ContestBannerImage from "../../assets/images/contest_banner.png";
import "./styles.scss";

const ContestBanner = () => {
  return (
    <div className="contest-banner">
      <img className="contest-banner-image" src={ContestBannerImage} />
    </div>
  );
};

export default ContestBanner;
