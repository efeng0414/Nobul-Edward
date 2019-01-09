import {
  SERVICES_GROUPS_BUY,
  SERVICES_GROUPS_SELL
} from "../../core/constants/services";
import { BUY } from "../../core/constants/shared";
import { translate } from "./locale";

// Creates a list of services from the groups.
// This is what the services thunk used to return
export const getServicesList = ({ serviceType, intl }) => {
  const serviceGroup =
    serviceType === BUY ? SERVICES_GROUPS_BUY : SERVICES_GROUPS_SELL;

  const servicesList = [];

  Object.values(serviceGroup).map(group => { // eslint-disable-line
    group.map(key => { // eslint-disable-line
      servicesList.push({
        value: key,
        label: translate(intl, key),
        tooltip: translate(intl, `${key}.tooltip`)
      });
    });
  });

  return servicesList;
};
