import React from "react";
import { Icon, Tag } from "antd";
import { JOB_ACCEPTED, JOB_DELETED } from "../../../core/constants/jobs";
import {
  OFFER_OPEN,
  OFFER_ACCEPTED,
  OFFER_REJECTED,
  OFFER_WITHDRAWN,
  OFFER_PENDING_VERIFICATION
} from "../../../core/constants/offers";
import { translate } from "../../utilities/locale";

export const TAG_MAP = {
  ACCEPTED: {
    condition: ({ correspondingJob, offerDetail, withdraw }) =>
      !withdraw &&
      correspondingJob.status === JOB_ACCEPTED &&
      offerDetail.status === OFFER_ACCEPTED,
    jsx: ({ intl }) => (
      <Icon type="check" key="ACCEPTED">
        {translate(intl, "offerAccepted")}
      </Icon>
    )
  },
  OPEN: {
    condition: ({ correspondingJob, offerDetail, withdraw }) =>
      !withdraw && offerDetail.status === OFFER_OPEN,
    jsx: ({ intl }) => (
      <Tag className="agent-offer__tag agent-offer__tag--open" key="OPEN">
        {translate(intl, "offerOpen")}
      </Tag>
    )
  },
  REJECTED: {
    condition: ({ correspondingJob, offerDetail, withdraw }) =>
      !withdraw && offerDetail.status === OFFER_REJECTED,
    jsx: ({ intl }) => (
      <Tag
        className="agent-offer__tag agent-offer__tag--rejected"
        key="REJECTED"
      >
        {translate(intl, "offerRejected")}
      </Tag>
    )
  },
  WITHDRAWN: {
    condition: ({ correspondingJob, offerDetail, withdraw }) =>
      withdraw || offerDetail.status === OFFER_WITHDRAWN,
    jsx: ({ intl }) => (
      <Tag
        className="agent-offer__tag agent-offer__tag--withdrawn"
        key="WITHDRAWN"
      >
        {translate(intl, "offerWithdrawn")}
      </Tag>
    )
  },

  JOB_DELETED: {
    condition: ({ correspondingJob, offerDetail, withdraw }) =>
      !withdraw && correspondingJob.status === JOB_DELETED,
    jsx: ({ intl }) => (
      <Tag
        className="agent-offer__tag agent-offer__tag--job-deleted"
        key="JOB_DELETED"
      >
        {translate(intl, "offer.jobDeletedTag")}
      </Tag>
    )
  },

  PENDING_VERIFICATION: {
    condition: ({ correspondingJob, offerDetail, withdraw }) =>
      !withdraw && offerDetail.status === OFFER_PENDING_VERIFICATION,
    jsx: ({ intl }) => (
      <Tag
        className="agent-offer__tag agent-offer__tag--pending-verification"
        key="OPEN"
      >
        {translate(intl, "offerPendingVerification")}
      </Tag>
    )
  }
};
