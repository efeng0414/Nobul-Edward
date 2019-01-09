import React from "react";
import { Card } from "antd";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";
import { NOBUL_101, WORLD_OPP } from "../../utilities/images";
import "./styles.scss";

const ConsumerLearningCenterImage = ({ intl, title }) => (
  <div>
    {title}
    <Card className="learning-center-images">
      <div>
        <a
          href="https://wp.nobul.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={NOBUL_101} alt={translate(intl, "learningCenter")} />
        </a>
      </div>
      <div>
        <img src={WORLD_OPP} alt={translate(intl, "learningCenter")} />
      </div>
    </Card>
  </div>
);

ConsumerLearningCenterImage.propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.any
};

export default ConsumerLearningCenterImage;
