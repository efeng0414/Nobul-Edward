export const getDisabledHours = ({ maxHour, maxMinute }) => {
  return () =>
    [...new Array(24)]
      .map((_, index) => index)
      .filter(
        hour => (maxHour === hour && maxMinute + 30 > 60) || hour < maxHour
      );
};

export const getDisabledMinutes = ({ maxHour, maxMinute, offset = 0 }) => {
  return selectedHour =>
    [...new Array(60)].map((_, index) => index).filter(minute => {
      if (maxHour === selectedHour) {
        return minute < maxMinute + offset;
      } else if (maxHour + 1 === selectedHour && maxMinute > offset) {
        return minute < maxMinute - offset;
      }
      return false;
    });
};
