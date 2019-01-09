import firebase from "firebase/app";
import "firebase/database";
import { CONFIG, FEATURES } from "../api-transform/config.js";

export const getActiveFeatures = () =>
  firebase
    .database()
    .ref(`${CONFIG}/${FEATURES}`)
    .once("value");
