import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import classnames from "classnames";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../../../utilities/locale";
import {
  COUNTRY,
  PROVINCE_OR_STATE
} from "../../../../../core/api-transform/users";

const uneditableField = [COUNTRY, PROVINCE_OR_STATE];

const SettingsFieldItem = ({
  onEditClick,
  id,
  value,
  labelKey,
  halfWidth,
  intl,
  isAgent
}) => {
  const settingsFieldItemClassNames = classnames("settings-field-item", {
    "half-width": halfWidth
  });

  const unEditable = isAgent && uneditableField.includes(id);

  return (
    <div className={settingsFieldItemClassNames}>
      <label className="label">
        {translate(intl, labelKey)}
        {unEditable ? null : <Icon type="edit" onClick={onEditClick} id={id} />}
      </label>
      {id === "password" ? (
        <p className="value">********</p>
      ) : (
        !!value && <p className="value">{value}</p>
      )}
    </div>
  );
};

SettingsFieldItem.propTypes = {
  labelKey: PropTypes.string.isRequired,
  value: PropTypes.string,
  onEditClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  halfWidth: PropTypes.bool,
  intl: intlShape.isRequired,
  isAgent: PropTypes.bool
};

SettingsFieldItem.defaultProps = {
  halfWidth: false,
  value: ""
};

export default injectIntl(SettingsFieldItem);
