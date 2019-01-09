import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

import { translate } from "../../utilities/locale";
import { intlShape } from "react-intl";

import mlsIcon from "../../assets/images/mls-logo.svg";
import realtorIcon from "../../assets/images/realtor-logo.svg";
import PropertyLogoIcon from "../property-logo-icon";

import "./styles.scss";

const isTrue = value => !!value;
const renderWithSpace = value => `${value} `;
const remarkId = "(id:24002)";

const PropertyDescriptionCard = ({ propertyDetailsCardInformation, intl }) => {
  if (Object.keys(propertyDetailsCardInformation).length) {
    const {
      publicRemarks,
      amenitiesNearBy: amenities = [],
      utilitiesAvailable: utilities = []
    } = propertyDetailsCardInformation;

    const amenitiesExist = amenities.some(isTrue);
    const utilitiesExist = utilities.some(isTrue);
    const publicRemarksWithoutId = publicRemarks.replace(remarkId, "");

    return (
      <div className="property-description">
        <Card loading={!Object.keys(propertyDetailsCardInformation).length}>
          <div className="property-description__card">
            {!!publicRemarks.length && (
              <div className="property-description__remarks">
                {publicRemarksWithoutId}
              </div>
            )}
            {amenitiesExist ||
              (utilitiesExist && (
                <div className="property-description__extras">
                  <h5 className="property-description__subtitle">
                    {translate(intl, "listingDetails.extras")}
                  </h5>
                  {amenitiesExist && (
                    <p>
                      {`${translate(intl, "ammentiesNearby")}: `}
                      {amenities.map(renderWithSpace)}
                    </p>
                  )}
                  {utilitiesExist && (
                    <p>
                      {`${translate(intl, "utilitiesAvailable")}: `}
                      {utilities.map(renderWithSpace)}
                    </p>
                  )}
                </div>
              ))}
            <div className="property-description__icons">
              <PropertyLogoIcon iconSrc={mlsIcon} />
              <PropertyLogoIcon iconSrc={realtorIcon} />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  //TODO: Return some default information here in case there is no data to display
  //TODO: Get the information for the Extras column
  return null;
};

PropertyDescriptionCard.propTypes = {
  propertyDetailsCardInformation: PropTypes.object,
  intl: intlShape.isRequired
};

PropertyDescriptionCard.defaultProps = {
  propertyDetailsCardInformation: {
    AgentDetails: [
      {
        Office: [
          {
            Name: [""]
          }
        ]
      }
    ]
  }
};

export default PropertyDescriptionCard;
