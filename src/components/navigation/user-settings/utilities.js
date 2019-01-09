const accountSettings = {
  labelKey: "accountSettings",
  route: "account"
};

const notificationSettings = {
  labelKey: "notificationSettings",
  route: "notification"
};

export const agentSettingsDropdownConfig = [
  {
    labelKey: "proposalSettings",
    route: "proposal"
  },
  accountSettings,
  // REMOVE_PREMIUM
  // {
  //   labelKey: "subscriptionSettings",
  //   route: "subscription"
  // },
  notificationSettings
];

export const consumerSettingsDropdownConfig = [
  accountSettings,
  notificationSettings
];
