import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import {
  ICON_FACEBOOK,
  ICON_TWITTER,
  ICON_INSTAGRAM,
  ICON_APP_STORE,
  ICON_GOOGLE_PLAY
} from "../../utilities/images";
import { translate } from "../../utilities/locale";
import { Layout } from "antd";

import "./styles.scss";

import classnames from "classnames";
import mlsIcon from "../../assets/images/mls-logo.svg";
import realtorIcon from "../../assets/images/realtor-logo.svg";
import * as Routes from "../../routes/routes";
import { getLabelKeyForProvinceOrState } from "./utilities";
import Devices from "../breakpoints/devices";
import { DESKTOP, TABLET } from "../../../core/constants/breakpoints";
import { getLocation } from "../../utilities/url";
import userLocation from "../../utilities/user-location";
import { withRouter } from "react-router-dom";
import { DEFAULT_REGION } from "../../../core/constants/shared";
import MLSFooter from "./mls-footer";

@withRouter
@injectIntl
@userLocation
class Footer extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
    userLocation: PropTypes.object.isRequired
  };

  @bound
  getProvinceOrState() {
    const isPathnameWithProvinceOrStateInUrl =
      this.props.location.pathname === Routes.url.browseListingsMap ||
      this.props.location.pathname.includes(
        Routes.url.listingDetails.replace(":listingId", "")
      );

    if (isPathnameWithProvinceOrStateInUrl) {
      return getLocation(this.props.location);
    } else if (this.props.userLocation.state) {
      return this.props.userLocation.state;
    } else {
      return DEFAULT_REGION;
    }
  }

  isMyDashboard() {
    return this.props.location.pathname.includes(Routes.url.myNobul);
  }

  render() {
    const labelKeyForProvinceOrState = getLabelKeyForProvinceOrState({
      provinceOrState: this.getProvinceOrState()
    });

    const classes = classnames(
      {
        "layout-footer": true
      },
      {
        "layout-footer--my-dashboard": this.isMyDashboard()
      }
    );

    return (
      <Layout.Footer className={classes}>
        <div className="footer">
          <div className="footer__links">
            <ul>
              <li>
                <a
                  href="https://corp.nobul.com/legal/terms-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "termsOfUse")}
                </a>
              </li>
              <li>
                <a
                  href="https://corp.nobul.com/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "privacy")}
                </a>
              </li>
              <li>
                <a
                  href="https://corp.nobul.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "corporate")}
                </a>
              </li>
              <li>
                <a
                  href="https://corp.nobul.com/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "aboutUs")}
                </a>
              </li>
              <li>
                <a
                  href="https://corp.nobul.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "nobulMagazine")}
                </a>
              </li>
              <li>
                <a
                  href="https://corp.nobul.com/team/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "ourTeam")}
                </a>
              </li>
              <li>
                <a
                  href="https://jobs.lever.co/nobul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate(this.props.intl, "joinOurTeam")}
                </a>
              </li>
            </ul>
            <div className="footer__links--downloads">
              <a
                href="https://itunes.apple.com/ca/app/nobul/id1295208907?mt=8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ICON_APP_STORE}
                  alt={translate(this.props.intl, "downloadAppStore")}
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.nobul&hl=en_CA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ICON_GOOGLE_PLAY}
                  alt={translate(this.props.intl, "downloadGooglePlay")}
                />
              </a>
            </div>
          </div>
          <Devices sizes={[DESKTOP, TABLET]}>
            <MLSFooter
              labelKeyForProvinceOrState={labelKeyForProvinceOrState}
              realtorIcon={realtorIcon}
              mlsIcon={mlsIcon}
            />
          </Devices>
          <div className="footer__information">
            <div className="footer__address">
              <strong>
                {translate(
                  this.props.intl,
                  `regionalContent.${labelKeyForProvinceOrState}.nobulAddressLine1`
                )}
              </strong>
              <br />
              {translate(
                this.props.intl,
                `regionalContent.${labelKeyForProvinceOrState}.nobulAddressLine2`
              )}
              <br />
              {translate(
                this.props.intl,
                `regionalContent.${labelKeyForProvinceOrState}.nobulAddressLine3`
              )}
            </div>
            <div>
              <div className="footer__social">
                <a
                  href="https://www.facebook.com/NobulRealEstate/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ICON_FACEBOOK}
                    alt={translate(this.props.intl, "facebook")}
                  />
                </a>
                <a
                  href="https://twitter.com/Nobul"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ICON_TWITTER}
                    alt={translate(this.props.intl, "twitter")}
                  />
                </a>
                <a
                  href="https://www.instagram.com/nobulrealestate/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ICON_INSTAGRAM}
                    alt={translate(this.props.intl, "instagram")}
                  />
                </a>
              </div>
              <div className="footer__copyright">
                {translate(this.props.intl, "copyright")}
              </div>
            </div>
          </div>
        </div>
      </Layout.Footer>
    );
  }
}

export default Footer;
