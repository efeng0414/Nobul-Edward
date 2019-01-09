import React from "react";
import { Card } from "antd";
import { intlShape } from "react-intl";
import Nobul101 from "../../assets/images/nobul101.png";

import "./styles.scss";

const ConsumerStories = () => {
  return (
    <Card className="stories">
      <a href="https://wp.nobul.com/" target="_blank" rel="noopener noreferrer">
        <img src={Nobul101} />
      </a>
    </Card>
  );
};

ConsumerStories.propTypes = {
  intl: intlShape.isRequired
};

export default ConsumerStories;
