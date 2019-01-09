import React from "react";
import UserSettings from "../index";
import { consumerSettingsDropdownConfig } from "../utilities";

const ConsumerUserSettings = props => (
  <UserSettings settingsMenuItems={consumerSettingsDropdownConfig} {...props} />
);

export default ConsumerUserSettings;
