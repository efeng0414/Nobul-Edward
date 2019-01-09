import React from "react";
import { translate } from "./locale";
import Features1 from "../assets/images/features1.svg";
import Features2 from "../assets/images/features2.svg";
import Features3 from "../assets/images/features3.svg";
import Features4 from "../assets/images/features4.svg";

const freeTrialFaq = ({ intl }) => [
  {
    key: 0,
    title: translate(intl, "freeTrial.faq1.title"),
    body: translate(intl, "freeTrial.faq1.body")
  },
  {
    key: 1,
    title: translate(intl, "freeTrial.faq2.title"),
    body: translate(intl, "freeTrial.faq2.body")
  },
  {
    key: 2,
    title: translate(intl, "freeTrial.faq3.title"),
    body: translate(intl, "freeTrial.faq3.body")
  }
];

const freeTrialFeatures = ({ intl }) => [
  {
    key: 0,
    src: Features1,
    alt: translate(intl, "freeTrial.feature1.title"),
    title: translate(intl, "freeTrial.feature1.title"),
    body: translate(intl, "freeTrial.feature1.body")
  },
  {
    key: 1,
    src: Features2,
    alt: translate(intl, "freeTrial.feature2.title"),
    title: translate(intl, "freeTrial.feature2.title"),
    body: translate(intl, "freeTrial.feature2.body")
  },
  {
    key: 2,
    src: Features3,
    alt: translate(intl, "freeTrial.feature3.title"),
    title: translate(intl, "freeTrial.feature3.title"),
    body: translate(intl, "freeTrial.feature3.body")
  },
  {
    key: 3,
    src: Features4,
    alt: translate(intl, "freeTrial.feature4.title"),
    title: translate(intl, "freeTrial.feature4.title"),
    body: translate(intl, "freeTrial.feature4.body")
  }
];

const renderFreeTrialFaqItem = ({ key, title, body }) => {
  return (
    <div className="free-trial-faq-item" key={key}>
      <div className="free-trial-faq-item-title">{title}</div>
      <div className="free-trial-faq-item-body">{body}</div>
    </div>
  );
};

const renderFreeTrialFeatures = ({ key, src, alt, title, body }) => {
  return (
    <div className="free-trial-info-grid-item" key={key}>
      <div className="free-trial-info-grid-item-count">
        <img src={src} alt={alt} />
      </div>
      <div className="free-trial-info-grid-item-content">
        <div className="free-trial-info-grid-item-content-title">{title}</div>
        <div className="free-trial-info-grid-item-content-body">{body}</div>
      </div>
    </div>
  );
};

export {
  freeTrialFaq,
  freeTrialFeatures,
  renderFreeTrialFaqItem,
  renderFreeTrialFeatures
};
