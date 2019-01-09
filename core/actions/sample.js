import { SET_SAMPLE_DATA } from "../types/sample";

const setSampleData = data => {
  return {
    type: SET_SAMPLE_DATA,
    data
  };
};

export { setSampleData };
