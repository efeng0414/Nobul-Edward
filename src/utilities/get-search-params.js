export const getSearchParamObject = ({ searchParamString }) =>
  searchParamString
    .replace("?", "")
    .split("&")
    .reduce((accumulator, param) => {
      const [key, value] = param.split("=");
      return {
        ...accumulator,
        [key]: value
      };
    }, {});
