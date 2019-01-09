import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import moment from "moment-timezone";

import { objectIsEmpty } from "../utilities/misc";
import { createObjectFromArray } from "../utilities/array-to-object";
import { USERS, AGENTS, CONSUMERS, AUTOBID } from "../api-transform";
import {
  EMAIL,
  PHONE_PREFIX,
  PHONE,
  ADDRESS1,
  ADDRESS2,
  LOOKING_FOR,
  TIMELINE,
  CREATED_AT,
  UPDATED_AT,
  CREATED_ON,
  MARKETING,
  CITY,
  PROVINCE_OR_STATE,
  COUNTRY,
  POSTAL_OR_ZIP_CODE,
  PROFILE,
  VERIFICATION,
  SERVICES,
  BUY,
  SELL,
  LOCATIONS,
  AGENT_TYPE,
  DEFAULT_COMMISSIONS,
  LISTING_COMMISSION,
  COOPERATING_COMMISSION,
  REBATE_COMMISSION,
  BUY_PRICE_RANGE,
  SELL_PRICE_RANGE,
  BROKERAGE_NAME,
  BROKERAGE_PHONE,
  BROKERAGE_ADDRESS,
  FIRST_NAME,
  LAST_NAME,
  FAVORITE_LISTINGS,
  AGREEMENTS,
  PERSONALIZED_MESSAGE,
  TIMEZONE,
  NOTIFICATIONS,
  IS_MIGRATED,
  AVATAR_TYPE,
  LICENSE_NUMBER,
  LICENSE_COUNTRY,
  LICENSE_PROVINCE,
  LICENCE_EXPIRY_DATE,
  LICENCE_STATUS
} from "../api-transform/users";
import {
  FORM_DATA,
  AGENT_NAME,
  CLIENT_NAME,
  ENVELOPE_ID,
  REGION,
  SIGNERS,
  STATUS,
  TYPE,
  ENVELOPE_STATUS
} from "../api-transform/contracts";
import { TAGLINE } from "../api-transform/offers";
import { checkPropertyExist } from "../utilities/checkPropertyExist";
import { filterByMultipleValues } from "../utilities/filter-data";
import {
  AGENT_USER_TYPE,
  AVATAR,
  LICENSE,
  IMAGE_TYPE_JPG,
  VERIFICATION_SCREENSHOT
} from "../constants/users";

const FIREBASE_LICENSE_IMAGE_BUCKET = process.env.FIREBASE_LICENSE_IMAGE_BUCKET; // eslint-disable-line
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET; // eslint-disable-line

export const updateTimeZoneToCurrentBrowserTime = ({ userId, userType }) => {
  firebase
    .database()
    .ref(`${USERS}/${userType}/${userId}/${TIMEZONE}`)
    .set(moment.tz.guess());
};

const authStateChange = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // This function is checking if the user is logged in or not.
        // It isn't an error if they're not logged in.
        return resolve(null);
      }

      getUserNode(user)
        .then(userNode => {
          const { profile = {}, createdAt = null } = userNode.val();
          const { name = "" } = profile;
          const { uid = "", email = "" } = user;
          let intercomUpdates = {
            user_id: uid,
            name,
            email,
            created_at: createdAt / 1000 // Unix time stamp converted to seconds
          };
          window.Intercom("update", intercomUpdates);
          resolve(user);
        })
        .catch(error => {
          reject(error);
          window.Intercom("update");
        });
    });
  });
};

const getUserProfilePath = user => `${USERS}/${user.uid}/${PROFILE}`;

const getUserProfileById = ({ userId, userType }) =>
  firebase
    .database()
    .ref(`${USERS}/${userType}/${userId}/${PROFILE}`)
    .once("value");

const getAgentAutoBidStatus = ({ userId, jobType }) =>
  firebase
    .database()
    .ref(`${USERS}/${AGENTS}/${userId}/${AUTOBID}/${jobType}/${STATUS}`)
    .once("value");

const getAgentServicePath = user =>
  `${USERS}/${AGENTS}/${user.uid}/${SERVICES}`;

const getAgentCommissionPath = user => {
  return `${USERS}/${AGENTS}/${user.uid}/${DEFAULT_COMMISSIONS}`;
}; // still use commission, because there is a bug on api transform file, and it used in many place in this file.

const getCurrentUser = () => firebase.auth();

const getAgentUserNode = user =>
  firebase
    .database()
    .ref(`${USERS}/${AGENTS}/${user.uid}`)
    .once("value");

const getAgentUserNodeFromUserId = ({ userId }) =>
  firebase
    .database()
    .ref(`${USERS}/${AGENTS}/${userId}`)
    .once("value");

const getConsumerUserNode = user =>
  firebase
    .database()
    .ref(`${USERS}/${CONSUMERS}/${user.uid}`)
    .once("value");

const getMultipleConsumers = ({ consumerIdArray }) =>
  Promise.all(
    consumerIdArray.map(consumerId =>
      getUserProfileById({ userId: consumerId, userType: CONSUMERS })
    )
  );

const getUserNode = user =>
  new Promise(resolve => {
    const agentProm = getAgentUserNode(user);
    const consumerProm = getConsumerUserNode(user);
    Promise.all([agentProm, consumerProm]).then(data => {
      const userSnapshot = data[0].val() ? data[0] : data[1];
      resolve(userSnapshot);
    });
  });

const resendEmailVerification = () =>
  firebase.auth().currentUser.sendEmailVerification();

const saveDisplayName = ({ resolveItem, name }) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name
      })
      .then(() => {
        resolve(resolveItem);
      })
      .catch(err => {
        reject(err);
      });
  });

const getUserCredentials = (email, password) =>
  firebase.auth.EmailAuthProvider.credential(email, password);

const linkUserWithCredentials = credential =>
  firebase.auth().currentUser.linkWithCredential(credential);

const setUserUpdatedAt = user =>
  firebase
    .database()
    .ref(getUserProfilePath(user))
    .update({
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });

const getPersistanceMethod = ({ noPersistance }) => {
  if (noPersistance) return firebase.auth.Auth.Persistence.NONE;
  return firebase.auth.Auth.Persistence.LOCAL;
};

const signInUser = (email, password, noPersistance) => {
  const persistenceMethod = getPersistanceMethod({ noPersistance });
  return firebase
    .auth()
    .setPersistence(persistenceMethod)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    });
};

const signOutUser = ({ preSignOutFunction }) => {
  preSignOutFunction && preSignOutFunction();
  return firebase.auth().signOut();
};

const reloadUser = () => firebase.auth().currentUser.reload();

const createUserWithEmailPassword = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const setUserType = (user, userType) =>
  firebase
    .database()
    .ref(getUserProfilePath(user))
    .set({
      userType,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });

const getUserSnapshot = user =>
  firebase
    .database()
    .ref(getUserProfilePath(user))
    .once("value");

const getAgentServicesSnapshot = user =>
  firebase
    .database()
    .ref(getAgentServicePath(user))
    .once("value");

const getAgentCommissionSnapshot = user =>
  firebase
    .database()
    .ref(getAgentCommissionPath(user))
    .once("value");

const postLicenseImage = (userId, file) =>
  firebase
    .app()
    .storage(`gs://${FIREBASE_LICENSE_IMAGE_BUCKET}`)
    .ref(userId)
    .child(LICENSE)
    .put(file, { contentType: file.type });

export const postLicenseImageMobile = ({ userId, base64Image }) =>
  firebase
    .app()
    .storage(`gs://${FIREBASE_LICENSE_IMAGE_BUCKET}`)
    .ref(userId)
    .child(LICENSE)
    .put(base64Image, { contentType: IMAGE_TYPE_JPG });

const postAvatarImage = (userId, file) =>
  firebase
    .app()
    .storage(`gs://${FIREBASE_STORAGE_BUCKET}`)
    .ref(userId)
    .child(AVATAR)
    .put(file, { contentType: file.type });

export const postAvatarImageMobile = ({ userId, base64Image }) =>
  firebase
    .app()
    .storage(`gs://${FIREBASE_STORAGE_BUCKET}`)
    .ref(userId)
    .child(AVATAR)
    .put(base64Image, { contentType: IMAGE_TYPE_JPG });

const getAvatarImageUrl = ({ userId }) =>
  new Promise(resolve =>
    firebase
      .app()
      .storage(`gs://${FIREBASE_STORAGE_BUCKET}`)
      .ref(`${userId}/avatar`)
      .getDownloadURL()
      .then(url => resolve(url))
      .catch(() => resolve(""))
  );

export const getLicenseImageUrl = ({ userId }) =>
  new Promise(resolve =>
    firebase
      .app()
      .storage(`gs://${FIREBASE_LICENSE_IMAGE_BUCKET}`)
      .ref(`${userId}/license`)
      .getDownloadURL()
      .then(url => resolve(url))
      .catch(() => resolve(""))
  );

export const getAgentVerificationScreenshotUrl = ({ userId }) =>
  new Promise(resolve =>
    firebase
      .app()
      .storage(`gs://${FIREBASE_LICENSE_IMAGE_BUCKET}`)
      .ref(`${userId}/${VERIFICATION_SCREENSHOT}`)
      .getDownloadURL()
      .then(url => resolve(url))
      .catch(() => resolve(""))
  );

export const postAgentVerificationScreenshot = ({ userId, file }) =>
  firebase
    .app()
    .storage(`gs://${FIREBASE_LICENSE_IMAGE_BUCKET}`)
    .ref(userId)
    .child(VERIFICATION_SCREENSHOT)
    .put(file, { contentType: file.type });

const getMultipleAvatarImageUrl = ({ users }) =>
  Promise.all(users.map(userId => getAvatarImageUrl({ userId })));

const setConsumerUserNodeInDatabase = consumerPostData => {
  const { uid = "" } = firebase.auth().currentUser;

  return firebase
    .database()
    .ref(`/${USERS}/${CONSUMERS}/${uid}`)
    .set(consumerPostData);
};

const setAgentUserNodeInDatabase = agentPostData => {
  const { uid = "" } = firebase.auth().currentUser;

  return firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .set(agentPostData);
};

const updateAgentUserNodeInDatabase = ({ nodeData, path }) => {
  const { uid = "" } = firebase.auth().currentUser;
  const nodeLocation = path
    ? `/${USERS}/${AGENTS}/${uid}/${path}`
    : `/${USERS}/${AGENTS}/${uid}`;

  return firebase
    .database()
    .ref(nodeLocation)
    .update(nodeData);
};

const resetUserPassword = email =>
  firebase.auth().sendPasswordResetEmail(email);

const updateAnonymousUserFavoriteList = ({ uid, favoriteList }) => {
  const updatePath = `/${USERS}/${CONSUMERS}/${uid}/${FAVORITE_LISTINGS}`;
  return firebase
    .database()
    .ref(updatePath)
    .update(favoriteList);
};

const updateCurrentUserProfile = user => {
  const {
    userType,
    address1,
    address2 = "",
    email,
    phone,
    phonePrefix,
    profile,
    createdOn
  } = user;
  const { firstName = "", lastName = "" } = profile;

  let updateData = {};
  if (userType === "agent") {
    const { city, country, postalOrZipCode, provinceOrState } = user;
    updateData = {
      [CREATED_ON]: createdOn,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [PROFILE]: {
        [FIRST_NAME]: firstName,
        [LAST_NAME]: lastName,
        [EMAIL]: email,
        [PHONE_PREFIX]: phonePrefix,
        [PHONE]: phone,
        [ADDRESS1]: address1,
        [ADDRESS2]: address2,
        [CITY]: city,
        [PROVINCE_OR_STATE]: provinceOrState,
        [COUNTRY]: country,
        [POSTAL_OR_ZIP_CODE]: postalOrZipCode
      }
    };
  } else {
    const { marketing } = user;
    const { lookingFor, timeline } = profile;
    updateData = {
      [CREATED_ON]: createdOn,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [MARKETING]: marketing,
      [PROFILE]: {
        [FIRST_NAME]: firstName,
        [LAST_NAME]: lastName,
        [EMAIL]: email,
        [PHONE_PREFIX]: phonePrefix,
        [PHONE]: phone,
        [TIMELINE]: timeline,
        [LOOKING_FOR]: lookingFor
      }
    };
  }

  const { currentUser } = user;
  const updatePath =
    userType === "agent"
      ? `/${USERS}/${AGENTS}/${currentUser.uid}`
      : `/${USERS}/${CONSUMERS}/${currentUser.uid}`;

  return firebase
    .database()
    .ref(updatePath)
    .update(updateData);
};

const updateCurrentUserPassword = (currentPassword, newPassword) => {
  const user = firebase.auth().currentUser;
  const credential = getUserCredentials(user.email, currentPassword);
  return user.reauthenticateWithCredential(credential).then(() => {
    return user.updatePassword(newPassword);
  });
};

const updateCurrentUserServicesAndCommissions = agentData => {
  const { buyServices, sellServices, commissions } = agentData;
  const { uid = "" } = firebase.auth().currentUser;
  const buyServicesObject = createObjectFromArray(buyServices);
  const sellServicesObject = createObjectFromArray(sellServices);
  return firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .update({
      [SERVICES]: {
        [BUY]: buyServicesObject,
        [SELL]: sellServicesObject
      },
      [DEFAULT_COMMISSIONS]: {
        [LISTING_COMMISSION]: commissions.listingRate,
        [COOPERATING_COMMISSION]: commissions.cooperativeRate,
        [REBATE_COMMISSION]: commissions.rebateRate
      }
    });
};

const updateCurrentUserRegionAndPropertyType = agentData => {
  const { selectedPolygons, propertyType } = agentData;
  const { uid = "" } = firebase.auth().currentUser;
  const propertyTypeObject = createObjectFromArray(propertyType);
  return firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .update({
      [AGENT_TYPE]: propertyTypeObject,
      [LOCATIONS]: selectedPolygons
    });
};

const updateCurrentUserRegions = ({ selectedPolygons }) => {
  const { uid = "" } = firebase.auth().currentUser;
  return firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .update({
      [LOCATIONS]: selectedPolygons
    });
};

const setFavoriteProperty = (uid, creaId, provinceOrState) =>
  firebase
    .database()
    .ref(`/${USERS}/${CONSUMERS}/${uid}/${FAVORITE_LISTINGS}`)
    .update({
      [creaId]: provinceOrState
    });

const removeFavoriteProperty = (uid, creaId) =>
  firebase
    .database()
    .ref(`/${USERS}/${CONSUMERS}/${uid}/${FAVORITE_LISTINGS}`)
    .update({
      [creaId]: null
    });

const getUsersFavoriteListings = ({ userId }) =>
  firebase
    .database()
    .ref(`/${USERS}/${CONSUMERS}/${userId}/${FAVORITE_LISTINGS}`)
    .once("value");

const getMultipleAgents = ({ agentIdArray }) =>
  Promise.all(
    agentIdArray.map(agentId =>
      getUserProfileById({ userId: agentId, userType: AGENTS })
    )
  );

const getAgentCreatedAt = ({ userId }) =>
  firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${userId}/${CREATED_AT}`)
    .once("value");

const authenticateUser = () =>
  new Promise((resolve, reject) => {
    const handleAuthResponse = ({ user }) =>
      user ? resolve(user) : reject({ invalidAuth: true });

    const { currentUser } = firebase.auth();
    if (currentUser) {
      return handleAuthResponse({ user: currentUser });
    } else {
      return firebase
        .auth()
        .onAuthStateChanged(user => handleAuthResponse({ user }));
    }
  });

const setStandardProposal = (uid, standardProposal) =>
  firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .update(standardProposal);

const getUserAgreementsStatus = ({ userId, userType }) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${USERS}/${userType}/${userId}/${AGREEMENTS}`)
      .once("value")
      .then(value => {
        const userAgreements = value.val();

        if (!userAgreements) {
          resolve({});
        } else {
          const filteredAgreements = filterByMultipleValues({
            filterValues: [BUY, SELL],
            entities: userAgreements,
            databaseKey: [TYPE]
          });

          if (!filteredAgreements) {
            resolve({});
          }

          const agreementIds = Object.keys(filteredAgreements);

          const agreementsPromise = agreementIds.map(agreementId =>
            firebase
              .database()
              .ref(
                `${AGREEMENTS}/${
                  filteredAgreements[agreementId][TYPE]
                }/${agreementId}`
              )
              .once("value")
          );

          Promise.all(agreementsPromise)
            .then(agreements => {
              const resp = {};
              agreementIds.forEach((agreementId, index) => {
                const agreement = agreements[index].val();

                resp[agreementId] = {
                  status: checkPropertyExist(agreement, SIGNERS)
                    ? agreement[SIGNERS][`${userId}`][STATUS]
                    : "",
                  country: agreement[COUNTRY],
                  region: agreement[REGION],
                  agentName: agreement[FORM_DATA][AGENT_NAME],
                  clientName: agreement[FORM_DATA][CLIENT_NAME],
                  envelopeId: checkPropertyExist(agreement, ENVELOPE_ID)
                    ? agreement[ENVELOPE_ID]
                    : "",
                  type: filteredAgreements[agreementId][TYPE],
                  envelopeStatus: checkPropertyExist(agreement, ENVELOPE_STATUS)
                    ? agreement[ENVELOPE_STATUS]
                    : ""
                };
              });

              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateCurrentUserStandardBuyOffer = ({ agentData }) => {
  const { uid = "" } = firebase.auth().currentUser;

  const updateRebateCommission = firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}/${DEFAULT_COMMISSIONS}`)
    .update({
      [REBATE_COMMISSION]: agentData[REBATE_COMMISSION]
    });

  const updateServices = firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}/${SERVICES}`)
    .update({
      [BUY]: createObjectFromArray(agentData[SERVICES])
    });

  const updateMessage = firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .update({
      [PERSONALIZED_MESSAGE]: agentData[PERSONALIZED_MESSAGE],
      [TAGLINE]: agentData[TAGLINE]
    });

  return Promise.all([updateRebateCommission, updateServices, updateMessage]);
};

const updateCurrentUserStandardSellOffer = ({ agentData }) => {
  const { uid = "" } = firebase.auth().currentUser;

  const updateServices = firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}/${SERVICES}`)
    .update({
      [SELL]: createObjectFromArray(agentData[SERVICES])
    });
  const updateDefaultCommission = firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}/${DEFAULT_COMMISSIONS}`)
    .update({
      [LISTING_COMMISSION]: agentData[LISTING_COMMISSION],
      [COOPERATING_COMMISSION]: agentData[COOPERATING_COMMISSION]
    });
  const updateMessage = firebase
    .database()
    .ref(`/${USERS}/${AGENTS}/${uid}`)
    .update({
      [PERSONALIZED_MESSAGE]: agentData[PERSONALIZED_MESSAGE],
      [TAGLINE]: agentData[TAGLINE]
    });

  return Promise.all([updateServices, updateDefaultCommission, updateMessage]);
};

export const updateCurrentUserProfileForKey = ({
  userId,
  key,
  value,
  userType
}) => {
  const ref = `${USERS}/${userType}/${userId}/${PROFILE}`;
  const valueToSave =
    key === BROKERAGE_PHONE || key === PHONE
      ? value.replace(/-| /gi, "")
      : value;

  // TODO: Duplicate in verification node for now.  Need to revisit how we handle this data.
  if (key === BROKERAGE_NAME || key === BROKERAGE_PHONE) {
    firebase
      .database()
      .ref(`${USERS}/${userType}/${userId}/${VERIFICATION}`)
      .update({
        [key]: valueToSave
      });
  }

  return firebase
    .database()
    .ref(ref)
    .update({
      [key]: valueToSave
    });
};

export const isUserEmailVerified = () =>
  firebase.auth().currentUser.emailVerified;

export const updateMarketingValueForUser = ({ userId, key, value, userType }) =>
  firebase
    .database()
    .ref(
      `${USERS}/${getUserNodeForUserType({ userType })}/${userId}/${MARKETING}`
    )
    .update({
      [key]: value
    });

export const checkIfEmailExists = email =>
  firebase.auth().fetchSignInMethodsForEmail(email);

export const updateNotificationSetting = ({ key, value, userId, userType }) =>
  firebase
    .database()
    .ref(
      `${USERS}/${getUserNodeForUserType({
        userType
      })}/${userId}/${NOTIFICATIONS}`
    )
    .update({
      [key]: value
    });

const getUserNodeForUserType = ({ userType }) =>
  userType === AGENT_USER_TYPE ? AGENTS : CONSUMERS;

export const setMigratedFlagToFalse = ({ userId, userType }) =>
  firebase
    .database()
    .ref(`${USERS}/${getUserNodeForUserType({ userType })}/${userId}`)
    .update({
      [IS_MIGRATED]: null
    });

export const updateUsersEmail = ({ password, email }) =>
  new Promise((resolve, reject) => {
    const updateEmailForCurrentUser = () => {
      const currentUser = firebase.auth().currentUser;
      const credential = getUserCredentials(currentUser.email, password);
      return currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => firebase.auth().currentUser.updateEmail(email))
        .catch(error => {
          throw new Error(error);
        });
    };

    checkIfEmailExists(email)
      .then(signInMethods => {
        const uniqueEmail = signInMethods.length === 0;

        if (uniqueEmail) return updateEmailForCurrentUser();
        throw new Error("Email is not unique");
      })
      .then(() => resendEmailVerification())
      .then(resolve)
      .catch(reject);
  });

export const setConsumerAvatar = ({ uid, avatarType }) =>
  firebase
    .database()
    .ref(`/${USERS}/${CONSUMERS}/${uid}/${PROFILE}`)
    .update({
      [AVATAR_TYPE]: avatarType
    });

export const updateAgentVerificationData = ({ verificationData }) => {
  const updatedDatePromise = updateAgentUserNodeInDatabase({
    nodeData: { [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP }
  });

  const agentProfile = {
    [ADDRESS1]: verificationData.address1,
    [ADDRESS2]: verificationData.address2,
    [CITY]: verificationData.city,
    [PROVINCE_OR_STATE]: verificationData.province,
    [COUNTRY]: verificationData.country,
    [POSTAL_OR_ZIP_CODE]: verificationData.postalOrZipCode
  };

  const agentVerification = {
    [BROKERAGE_NAME]: verificationData.brokerageName,
    [BROKERAGE_PHONE]: verificationData.brokeragePhone.replace(/-| /gi, ""),
    [LICENSE_COUNTRY]: verificationData.country,
    [LICENSE_PROVINCE]: verificationData.province
  };
  if (verificationData.brokerageLicenseNumber) {
    agentVerification[LICENSE_NUMBER] = verificationData.brokerageLicenseNumber;
  }

  const profilePromise = updateAgentUserNodeInDatabase({
    path: PROFILE,
    nodeData: agentProfile
  });

  const verificationPromise = updateAgentUserNodeInDatabase({
    path: VERIFICATION,
    nodeData: agentVerification
  });

  return Promise.all([
    updatedDatePromise,
    profilePromise,
    verificationPromise
  ]).then(() => {
    return { agentProfile, agentVerification };
  });
};

export const addAgentLicenceData = ({ verificationData }) => {
  const updatedDatePromise = updateAgentUserNodeInDatabase({
    nodeData: { [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP }
  });

  const profilePromise = updateAgentUserNodeInDatabase({
    path: PROFILE,
    nodeData: {
      [ADDRESS1]: verificationData.address1,
      [ADDRESS2]: verificationData.address2,
      [CITY]: verificationData.city,
      [PROVINCE_OR_STATE]: verificationData.province,
      [COUNTRY]: verificationData.country,
      [POSTAL_OR_ZIP_CODE]: verificationData.postalOrZipCode,
      [BROKERAGE_NAME]: verificationData.brokerageName,
      [BROKERAGE_PHONE]: verificationData.brokeragePhone
    }
  });

  const verificationPromise = updateAgentUserNodeInDatabase({
    path: VERIFICATION,
    nodeData: {
      [BROKERAGE_NAME]: verificationData.brokerageName,
      [BROKERAGE_PHONE]: verificationData.brokeragePhone,
      [LICENSE_NUMBER]: verificationData.licenseNumber,
      [LICENSE_COUNTRY]: verificationData.country,
      [LICENSE_PROVINCE]: verificationData.province,
      [LICENCE_EXPIRY_DATE]: verificationData.licenseExpiryDate,
      [LICENCE_STATUS]: verificationData.licenseStatus
    }
  });

  return Promise.all([updatedDatePromise, profilePromise, verificationPromise]);
};

export const addAgentVerificationDataReturnUser = ({ verificationData }) =>
  addAgentLicenceData({ verificationData }).then(() =>
    getAgentUserNode(firebase.auth().currentUser).then(agentSnapshot => {
      return {
        uid: firebase.auth().currentUser.uid,
        ...agentSnapshot.val()
      };
    })
  );

export const fetchUsersCreatedAtRange = ({
  userType = "consumers",
  startAt = 0,
  endAt = 0
}) =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${USERS}/${userType}`)
      .orderByChild(CREATED_AT)
      .startAt(startAt)
      .endAt(endAt)
      .once("value")
      .then(snapshot => resolve(snapshot.val()))
      .catch(reject);
  });

export const updateAgentVerification = ({ agentId, values }) =>
  agentId && !objectIsEmpty(values)
    ? firebase
        .database()
        .ref(`${USERS}/${AGENTS}/${agentId}/${VERIFICATION}`)
        .update(values)
    : Promise.reject("Enter an agent Id and verification values.");

export {
  getUserAgreementsStatus,
  getCurrentUser,
  getUserNode,
  getAgentUserNode,
  getAgentUserNodeFromUserId,
  getUserCredentials,
  linkUserWithCredentials,
  setUserUpdatedAt,
  signInUser,
  signOutUser,
  reloadUser,
  createUserWithEmailPassword,
  setUserType,
  getUserSnapshot,
  setConsumerUserNodeInDatabase,
  setAgentUserNodeInDatabase,
  postLicenseImage,
  postAvatarImage,
  getAvatarImageUrl,
  resetUserPassword,
  getAgentServicesSnapshot,
  getAgentCommissionSnapshot,
  updateAnonymousUserFavoriteList,
  updateCurrentUserPassword,
  updateCurrentUserProfile,
  updateCurrentUserServicesAndCommissions,
  updateCurrentUserRegionAndPropertyType,
  getUserProfileById,
  setFavoriteProperty,
  removeFavoriteProperty,
  getUsersFavoriteListings,
  authStateChange,
  getMultipleAgents,
  getMultipleAvatarImageUrl,
  getAgentCreatedAt,
  authenticateUser,
  resendEmailVerification,
  setStandardProposal,
  updateCurrentUserStandardBuyOffer,
  updateCurrentUserStandardSellOffer,
  getMultipleConsumers,
  getAgentAutoBidStatus,
  updateCurrentUserRegions,
  saveDisplayName
};
