import React from "react";
import UserSettings from "../index";
import { agentSettingsDropdownConfig } from "../utilities";

const AgentUserSettings = props => (
  <UserSettings settingsMenuItems={agentSettingsDropdownConfig} {...props} />
);

export default AgentUserSettings;
