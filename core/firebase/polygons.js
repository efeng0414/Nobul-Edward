import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { PROVINCES } from "../data/provinces";
import axios from "axios";

const FIREBASE_POLYGON_BOUNDARIES_BUCKET =
  process.env.FIREBASE_POLYGON_BOUNDARIES_BUCKET; // eslint-disable-line
const SUPPORTED_REGIONS_FILE_NAME = "supported-browse-regions.json";

export const getPolygonsForProvinceOrState = ({ provinceOrState }) => {
  const province = PROVINCES.find(
    province =>
      province.code.toLowerCase() === provinceOrState.toLowerCase() ||
      province.label.toLowerCase() === provinceOrState.toLowerCase()
  );

  const filename = province ? province.polygonFilename : false;

  return new Promise((resolve, reject) => {
    if (!filename) {
      reject({ error: `No polygon data for ${provinceOrState}` });
    }
    firebase
      .app()
      .storage(`gs://${FIREBASE_POLYGON_BOUNDARIES_BUCKET}`)
      .ref(filename)
      .getDownloadURL()
      .then(axios.get)
      .then(response => {
        resolve(response.data);
      })
      .catch(reject);
  });
};

export const getPolygonsForSupportedBrowseRegions = () => {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .storage(`gs://${FIREBASE_POLYGON_BOUNDARIES_BUCKET}`)
      .ref(SUPPORTED_REGIONS_FILE_NAME)
      .getDownloadURL()
      .then(axios.get)
      .then(response => {
        resolve(response.data);
      })
      .catch(reject);
  });
};
