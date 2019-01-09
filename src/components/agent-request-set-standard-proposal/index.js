import { Modal } from "antd";
import { translate } from "../../utilities/locale";
import * as Routes from "../../routes/routes";
import "./styles.scss";

export const AgentRequestSetStandardProposal = ({
  history,
  intl,
  errorText
}) => {
  Modal.confirm({
    title: translate(intl, "home.setStandardProposal"),
    content: translate(intl, errorText),
    okText: translate(intl, "button.create"),
    onOk: () => {
      const standardProposalRoute = Routes.url.standardProposalFlow
        .replace(":step?", "1")
        .replace(":stage?", "0");
      history.push(standardProposalRoute);
    },
    className: "create-standard-proposal-modal"
  });
};
