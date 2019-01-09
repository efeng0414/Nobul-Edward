export const LISTVIEW_SIDER_WIDTH = 300;

export const getPopupContentKey = provinceOrState =>
  `regionalContent.${provinceOrState}.browseTermsAndConditionsPopup`;

export const getDistance = ({ x1, y1, x2, y2 }) => {
  var xs = x2 - x1,
    ys = y2 - y1;

  xs *= xs;
  ys *= ys;

  return Math.sqrt(xs + ys);
};
