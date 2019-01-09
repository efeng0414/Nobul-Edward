import React from "react";
import { Card } from "antd";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import YouTube from "react-youtube";

import { translate } from "../../utilities/locale";
import "./styles.scss";

const ConsumerLearningCenter = ({ intl, title }) => {
  const videoOptions = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0
    },
    width: "100%"
  };

  return (
    <div>
      {title}
      <Card hoverable className="learning-center">
        <div className="learning-center-video">
          <YouTube
            videoId="7SWK40-8drw"
            opts={videoOptions}
            className="learning-center-video-iframe"
          />
        </div>
        <p>{translate(intl, "learningCenterBody")}</p>
      </Card>
    </div>
  );
};

ConsumerLearningCenter.propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.any
};

export default ConsumerLearningCenter;
