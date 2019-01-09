import { setSampleData } from "../actions/sample";

const setSampleDataAsync = function(data) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(setSampleData(data));
      resolve();
    });
  };
};

export { setSampleDataAsync };
