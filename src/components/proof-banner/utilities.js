import React from "react";

export const textKeys = [
  "socialProofBanner.2",
  "socialProofBanner.1",
  "socialProofBanner.3"
];

export const renderProofImage = (
  { image, alt, className } //eslint-disable-line
) => (
  <img
    className={`${"proof-banner__logo"} ${className}`}
    src={image}
    alt={alt}
    key={alt}
  />
);
