import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Layout } from "antd";
import { translate } from "../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";

class DisplayAgreement extends Component {
  state = {};

  mapDictionaryArray = keyArray => {
    const { intl } = this.props;
    const toJoin = [];

    keyArray.map(val => toJoin.push(translate(intl, val)));

    return toJoin.join(", ");
  };

  displayDataElem = (label, value, formatAs) => {
    let displayValue = value;

    switch (!value || formatAs) {
      case "date":
        displayValue = moment.unix(value).format("MM/DD/YYYY");
        break;
      case "percent":
        displayValue = `${value}%`;
        break;
      case "price":
        displayValue = `$${value}`;
        break;
      case "dictionarylookup":
        displayValue = this.mapDictionaryArray(value);
        break;
    }

    return (
      <div>
        <span>{label}</span> -
        <span>{displayValue || "..."}</span>
      </div>
    );
  };
  render() {
    const { intl, agreementType, agreement = {} } = this.props;

    // Pre-fill agreement details
    const {
      clientName,
      brokerageName,
      brokerageAddress,
      agentName,
      agentPhone,
      agentEmail,
      startDate,
      expiryDate,
      holdoverPeriod,
      mlsNumber,
      propertyType, // BUY
      propertyArea, // BUY
      commission, // BUY
      propertyAddress, // SELL
      price, // SELL
      listingCommission, // SELL
      cooperatingCommission // SELL
    } = agreement;

    return (
      <Layout>
        <h2>{agreementType} agreement</h2>
        {this.displayDataElem(translate(intl, "clientName"), clientName)}
        {this.displayDataElem(translate(intl, "brokerageName"), brokerageName)}
        {this.displayDataElem(
          translate(intl, "brokerageAddress"),
          brokerageAddress
        )}
        {this.displayDataElem(translate(intl, "agentName"), agentName)}
        {this.displayDataElem(translate(intl, "agentPhone"), agentPhone)}
        {this.displayDataElem(translate(intl, "agentEmail"), agentEmail)}
        {this.displayDataElem(translate(intl, "startDate"), startDate, "date")}
        {this.displayDataElem(
          translate(intl, "expiryDate"),
          expiryDate,
          "date"
        )}
        {this.displayDataElem(
          translate(intl, "holdoverPeriod"),
          holdoverPeriod
        )}
        {this.displayDataElem(translate(intl, "mlsNumber"), mlsNumber)}

        {/* BUY only */}
        {agreementType !== "buy" ||
          this.displayDataElem(translate(intl, "propertyArea"), propertyArea)}

        {/* BUY only */}
        {agreementType !== "buy" ||
          this.displayDataElem(
            translate(intl, "commission"),
            commission,
            "percent"
          )}

        {/* BUY only */}
        {agreementType !== "buy" ||
          this.displayDataElem(
            translate(intl, "propertyType"),
            propertyType,
            "dictionarylookup"
          )}

        {/* SELL only */}
        {agreementType !== "sell" ||
          this.displayDataElem(
            translate(intl, "propertyAddress"),
            propertyAddress
          )}

        {/* SELL only */}
        {agreementType !== "sell" ||
          this.displayDataElem(
            translate(intl, "propertyPrice"),
            price,
            "price"
          )}

        {/* SELL only */}
        {agreementType !== "sell" ||
          this.displayDataElem(
            translate(intl, "listingCommission"),
            listingCommission,
            "percent"
          )}

        {/* SELL only */}
        {agreementType !== "sell" ||
          this.displayDataElem(
            translate(intl, "cooperatingCommission"),
            cooperatingCommission,
            "percent"
          )}
      </Layout>
    );
  }
}

DisplayAgreement.propTypes = {
  intl: intlShape.isRequired,
  agreement: PropTypes.object,
  agreementType: PropTypes.string
};

export default injectIntl(DisplayAgreement);
