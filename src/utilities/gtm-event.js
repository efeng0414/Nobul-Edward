import throwError from "../../core/utilities/throwError";

export const gtmEvent = ({ name, dataLayer = window.dataLayer || [] }) => {
  !name && throwError({ error: "No name param passed to gtmEvent" });
  setTimeout(() => {
    dataLayer.push({
      event: name
    });
  }, 0);
};

export const gtmVariable = ({
  layerData = {},
  dataLayer = window.dataLayer || []
}) => {
  setTimeout(() => {
    dataLayer.push(layerData);
  }, 0);
};
