import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

import { translate } from "../../utilities/locale";
import { intlShape } from "react-intl";

import BedroomsIcon from "../../assets/images/icon_bedroom_small.svg";
import BathroomsIcon from "../../assets/images/icon_bathrooms_small.svg";
import ParkingIcon from "../../assets/images/icon_parking_small.svg";
import PoolIcon from "../../assets/images/icon_pool_small.svg";
import WashroomsIcon from "../../assets/images/icon_washroom_small.svg";
import ElevatorIcon from "../../assets/images/icon_elevator_small.svg";
import StorageIcon from "../../assets/images/icon_storage_small.svg";
import { RESIDENTIAL } from "../../../core/constants/shared";

import "./styles.scss";

const PropertyFeaturesCard = ({
  propertyDetailsCardInformation,
  featureCardType,
  intl
}) => {
  if (Object.keys(propertyDetailsCardInformation).length) {
    const {
      bedrooms,
      bathrooms,
      parkingName,
      PoolType
    } = propertyDetailsCardInformation;

    //For residential properties
    const bedroomInfo = bedrooms
      ? `${bedrooms} ${translate(intl, "bedrooms")}`
      : "N/A";

    const bathroomInfo = bathrooms
      ? `${bathrooms} ${translate(intl, "bathrooms")}`
      : "N/A";

    const parkingInfo = parkingName ? `${parkingName}` : "N/A";

    const poolInfo = PoolType && PoolType[0];

    //TO-DO: Use actual constant value

    const featureCardTypeFormatted =
      featureCardType.charAt(0).toLowerCase() + featureCardType.slice(1);
    const isResidential = featureCardTypeFormatted === RESIDENTIAL;

    //For commercial properties
    const storageInfo = `${translate(intl, "storageInfo")}`;
    const elevatorInfo = `${translate(intl, "elevatorInfo")}`;
    const washroomsInfo = `${translate(intl, "washroomsInfo")}`;

    return (
      <div className="property-features">
        <Card loading={!Object.keys(propertyDetailsCardInformation).length}>
          <div className="property-features__card">
            <div className="property-features__card-left">
              <div>
                <img src={isResidential ? BedroomsIcon : StorageIcon} />
                {isResidential ? bedroomInfo : storageInfo}
              </div>

              <div>
                <img src={isResidential ? BathroomsIcon : ElevatorIcon} />
                {isResidential ? bathroomInfo : elevatorInfo}
              </div>
            </div>

            <div className="property-features__card-right">
              {!isResidential && (
                <div>
                  <img src={WashroomsIcon} />
                  {washroomsInfo}
                </div>
              )}
              {isResidential &&
                poolInfo && (
                  <div>
                    <img src={PoolIcon} />
                    {poolInfo}
                  </div>
                )}
              <div>
                <img src={ParkingIcon} />
                {parkingInfo}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  //TODO: Get the information for the Extras column
  //TODO: Change "N/A" to something else based on Copy
  return null;
};

PropertyFeaturesCard.propTypes = {
  propertyDetailsCardInformation: PropTypes.object,
  featureCardType: PropTypes.string,
  intl: intlShape.isRequired
};

PropertyFeaturesCard.defaultProps = {
  propertyDetailsCardInformation: {
    Building: [
      {
        BedroomsTotal: [""],
        BathroomTotal: [""]
      }
    ],
    ParkingSpaces: [
      {
        Parking: [
          {
            Name: [""]
          }
        ]
      }
    ]
  },
  featureCardType: ""
};

export default PropertyFeaturesCard;
