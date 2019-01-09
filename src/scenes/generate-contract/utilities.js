import React from "react";
import { BUY, SELL } from "../../../core/api-transform/offers";
import AgentOfferItem from "../../components/agent-offer-item";

const renderOfferItemFactory = ({ jobType }) => (item, i) => (
  <AgentOfferItem key={i} offerDetail={item} jobType={jobType} />
);

export const renderOfferItemMap = {
  [BUY]: renderOfferItemFactory({ jobType: BUY }),
  [SELL]: renderOfferItemFactory({ jobType: SELL })
};
