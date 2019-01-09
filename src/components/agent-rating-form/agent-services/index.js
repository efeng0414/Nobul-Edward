import React from "react";
import { translate } from "../../../utilities/locale";
import { intlShape } from "react-intl";

export const AgentServices = ({ intl }) => {
  const agentServicesList = [
    [
      translate(intl, "rateAgents.videoTour"),
      translate(intl, "rateAgents.printAds")
    ],
    [
      translate(intl, "rateAgents.onlineAds"),
      translate(intl, "rateAgents.homeStaging")
    ],
    [
      translate(intl, "rateAgents.listingSign"),
      translate(intl, "rateAgents.photographs")
    ]
  ];

  const renderAgentServicesCell = services => (
    <td>
      <p className="agent-rate-form-review-content">{services}</p>
    </td>
  );

  const renderRow = rowItemsArray => (
    <tr>{rowItemsArray.map(renderAgentServicesCell)}</tr>
  );

  return (
    <div>
      <table className="agent-rate-form-review-center">
        {agentServicesList.map(renderRow)}
      </table>
    </div>
  );
};

AgentServices.propTypes = {
  intl: intlShape.isRequired
};

export default AgentServices;
