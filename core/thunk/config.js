import { setActiveFeatures } from "../actions/config";
import { getActiveFeatures } from "../firebase/config";

const getActiveFeaturesAsync = () => dispatch =>
  getActiveFeatures().then(snapshot =>
    dispatch(setActiveFeatures(snapshot.exists() ? snapshot.val() : {}))
  );

export { getActiveFeaturesAsync };
