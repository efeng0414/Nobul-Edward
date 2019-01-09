import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import {
  OFFERS,
  AGREEMENTS,
  CREATED_AT,
  CREATED_ON,
  CREATED_ON_WEB
} from "../api-transform";
import axios from "axios";
import { OFFER_ID } from "../api-transform/events";

const getBlankFormList = (country, region, formType) => {
  const apiURL = `${process.env.FIREBASE_FUNCTIONS_BASE_URL}/getFormsList`;  // eslint-disable-line

  return axios({
    method: "post",
    url: apiURL,
    data: {
      formType,
      country,
      region
    },
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};

const startSendEnvelope = ({ offerId, offerType }) => {
  const apiURL = `${process.env.FIREBASE_FUNCTIONS_BASE_URL}/monitorCreateEnvelope`;  // eslint-disable-line

  return axios({
    method: "post",
    url: apiURL,
    data: {
      offerId,
      offerType
    },
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};

const getBlankFormPDFUrl = storagePath => {
  const bucket = process.env.FIREBASE_BLANK_AGREEMENTS_BUCKET; // eslint-disable-line

  return getFileUrl(bucket, storagePath);
};

const getFileUrl = (bucket, storagePath) => {
  const storageRef = firebase
    .storage()
    .refFromURL(`gs://${bucket}/${storagePath}`);

  return storageRef.getDownloadURL();
};

const addAgreementToOffer = ({
  jobType,
  offerId,
  agreementType,
  agreementKey
}) => {
  return firebase
    .database()
    .ref(`${OFFERS}/${jobType}/${offerId}/${AGREEMENTS}`)
    .update({ [agreementType]: agreementKey });
};

const postAgreementToStorage = (fileBlob, fileName, filePath) => {
  return firebase
    .app()
    .storage(`gs://${process.env.FIREBASE_AGREEMENTS_UNSIGNED_BUCKET}`)  // eslint-disable-line
    .ref(filePath)
    .child(fileName)
    .put(fileBlob);
};

const updateAgreement = ({
  agreementKey,
  agreementData,
  agreementType,
  fileBlob
}) => {
  const { formData } = agreementData;

  // Remove undefineds from object
  Object.keys(formData).forEach(
    key => formData[key] === undefined && delete formData[key]
  );

  const { offerId } = agreementData;
  const dataPath = `${AGREEMENTS}/${agreementType}`;

  const postData = {
    ...agreementData,
    [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [CREATED_ON]: CREATED_ON_WEB
  };

  return firebase
    .database()
    .ref(`${dataPath}/${agreementKey}`)
    .set(postData)
    .then(() => {
      if (fileBlob && postData.fileName) {
        return postAgreementToStorage(
          fileBlob,
          postData.fileName,
          `${agreementType}/${agreementKey}`
        );
      }

      return Promise.resolve();
    })
    .then(() => {
      return addAgreementToOffer({
        jobType: postData.jobType,
        offerId,
        agreementType,
        agreementKey
      });
    });
};

function createNewAgreement({ agreementData, agreementType, fileBlob }) {
  const dataPath = `${AGREEMENTS}/${agreementType}`;

  return firebase
    .database()
    .ref(dataPath)
    .push({
      agentId: agreementData.agentId
    })
    .then(snapshot => {
      const agreementKey = snapshot.key;

      return updateAgreement({
        agreementKey,
        agreementData,
        agreementType,
        fileBlob
      });
    });
}

const getAgreement = (agreementType, agreementId) => {
  const dataPath = `${AGREEMENTS}/${agreementType}`;

  return firebase
    .database()
    .ref(`${dataPath}/${agreementId}`)
    .once("value");
};

const getOfferAgreements = ({ offerId, agreementType }) => {
  return firebase
    .database()
    .ref(`${AGREEMENTS}/${agreementType}`)
    .orderByChild(`${OFFER_ID}`)
    .equalTo(offerId)
    .once("value");
};

export {
  createNewAgreement,
  updateAgreement,
  getAgreement,
  getBlankFormPDFUrl,
  getBlankFormList,
  startSendEnvelope,
  getOfferAgreements
};
