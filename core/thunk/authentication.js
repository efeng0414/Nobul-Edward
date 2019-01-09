import {
  signInUser,
  signOutUser,
  reloadUser,
  getUserNode,
  createUserWithEmailPassword,
  resetUserPassword,
  getAgentServicesSnapshot,
  getAgentCommissionSnapshot,
  updateAnonymousUserFavoriteList,
  updateCurrentUserPassword,
  updateCurrentUserProfile,
  postAvatarImage,
  getAvatarImageUrl,
  getCurrentUser,
  updateCurrentUserServicesAndCommissions,
  updateCurrentUserRegionAndPropertyType,
  setFavoriteProperty,
  removeFavoriteProperty,
  getUsersFavoriteListings,
  authStateChange,
  getUserAgreementsStatus,
  resendEmailVerification,
  updateCurrentUserStandardBuyOffer,
  updateCurrentUserStandardSellOffer,
  getUserProfileById,
  updateCurrentUserProfileForKey,
  updateMarketingValueForUser,
  updateTimeZoneToCurrentBrowserTime,
  updateNotificationSetting,
  updateUsersEmail,
  updateCurrentUserRegions,
  addAgentVerificationDataReturnUser,
  updateAgentVerificationData,
  postLicenseImage,
  saveDisplayName,
  postAvatarImageMobile,
  postLicenseImageMobile,
  getLicenseImageUrl,
  updateAgentVerification
} from "../firebase/users";
import { getAgentRatingsForAgentId } from "../firebase/agentRatings";

import {
  CONSUMER_USER_TYPE,
  GOOGLE_MAPS_API_KEY,
  AGENT_USER_TYPE
} from "../constants/users";
import {
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD
} from "../constants/firebaseErrorCode";
import { JOB_OPEN } from "../constants/jobs";

import {
  registerConsumer,
  registerAgent
} from "../utilities/user-registration";
import { getAverageAgentRating } from "../utilities/averageRating";

import {
  usersIsLoading,
  resetPassword,
  loginUserSuccess,
  loginUserFailure,
  resetPasswordFailure,
  getAgentServicesSuccess,
  getAgentServicesFailure,
  getAgentCommissionSuccess,
  getAgentCommissionFailure,
  updatePassword,
  updatePasswordFailure,
  updateProfile,
  updateProfileFailure,
  updateServicesAndCommissions,
  updateServicesAndCommissionsFailure,
  updateRegionAndPropertyType,
  updateRegionAndPropertyTypeFailure,
  signOut,
  signOutFailure,
  setPropertyAsFavoriteSuccess,
  setPropertyAsFavoriteFailure,
  removePropertyAsFavoriteSuccess,
  removePropertyAsFavoriteFailure,
  setUserAvatarUrl,
  getUsersFavoriteListingsSuccess,
  getUsersFavoriteListingsFailure,
  setReverseGeolocationSuccess,
  setReverseGeolocationError,
  getAgentAverageRatingSuccss,
  getAgentAverageRatingFailure,
  getUsersAgreementStatusesSucc,
  getUsersAgreementStatusesFail,
  resendVerificationEmailSuccess,
  resendVerificationEmailFail,
  clearResendVerificationStatus,
  reloadUserLoading,
  reloadUserSuccess,
  reloadUserFailure,
  setFirstTimeRegistrationStatus,
  updateStandardBuyOfferSuccess,
  updateStandardBuyOfferFailure,
  updateStandardSellOfferSuccess,
  updateStandardSellOfferFailure,
  updateMarketingValueForUserSuccess,
  updateMarketingValueForUserFailure,
  updateNotificationSettingSuccess,
  updateNotificationSettingFailure,
  updateCurrentUserRegionsSuccess,
  updateCurrentUserRegionsFailure,
  addVerificationDataSuccess,
  addVerificationDataFailure,
  saveCurrentUserSuccess,
  getUserLicenseImageUrlSuccess,
  setUserAvatarUrlError,
  getUserLicenseImageUrlFailure,
  updateCurrentUserLicenseImageMobileSuccess,
  updateCurrentUserLicenseImageMobileFailure
} from "../actions/authentication";

import { fetchAllConsumerPendingJobs, updateJob } from "../firebase/jobs";

import axios from "axios";
import { AGENTS, CONSUMERS } from "../api-transform";
import { EMAIL, PROFILE, FIRST_NAME, LAST_NAME } from "../api-transform/users";

const sendEmailVerification = ({ user, dispatch }) => {
  return user
    .sendEmailVerification()
    .then(() => {
      dispatch(usersIsLoading(true));
      dispatch(setFirstTimeRegistrationStatus(true));
      return Promise.resolve();
      // TODO: intercom
    })
    .catch(err => {
      throw new Error(`Error sending email verification: ${err}`);
    });
};

const createNewUserWithEmailPassword = ({
  email,
  password,
  postData,
  type,
  agentData = {},
  dispatch,
  name
}) => {
  return createUserWithEmailPassword(email, password)
    .then(registeredUser => {
      return saveDisplayName({
        resolveItem: registeredUser,
        name
      });
    })
    .then(registeredUser => {
      const { user = {} } = registeredUser;

      if (user) {
        getUserNode(user)
          .then(userSnapshot => {
            dispatch(loginUserSuccess(user, userSnapshot.val()));
          })
          .catch(error => {
            dispatch(loginUserFailure(error));
          });

        return sendEmailVerification({
          user,
          postData,
          type,
          agentData,
          dispatch
        });
      }
    })
    .then(() => {
      if (type === CONSUMER_USER_TYPE) {
        return registerConsumer(postData, dispatch);
      } else {
        return registerAgent(postData, type, agentData, dispatch);
      }
    })
    .catch(err => {
      console.error("Error creating user with email and password: ", err);
      dispatch(loginUserFailure(err));
      throw new Error(err);
    });
};

export const signUpUserAsync = ({
  postData,
  type,
  agentData = {},
  preSignOutFunction = () => {},
  noPersistance = false
}) => {
  // TODO: intercom
  // resetUser();
  const { email, password, firstName, lastName } = postData;

  return dispatch => {
    return signOutUser({ preSignOutFunction }).then(() => {
      return signInUser(email, password, noPersistance)
        .then(payload => {
          const { user } = payload;
          return getUserNode(user)
            .then(userSnapshot => {
              dispatch(loginUserSuccess(user, userSnapshot.val()));
              dispatch(setFirstTimeRegistrationStatus(false));
              return Promise.resolve(user);
            })
            .catch(error => {
              dispatch(loginUserFailure(error));
              return Promise.reject(error);
            });
        })
        .catch(error => {
          if (error.code === AUTH_USER_NOT_FOUND) {
            return createNewUserWithEmailPassword({
              email,
              password,
              postData,
              type,
              agentData,
              dispatch,
              name: `${firstName} ${lastName}`
            });
          } else if (error.code === AUTH_WRONG_PASSWORD) {
            dispatch(loginUserFailure(error));
          }
          throw error;
        });
    });
  };
};

export const updateSignUpJob = ({ pendingJobsResponse }) => {
  const jobId = Object.keys(pendingJobsResponse)[0];
  const { jobType } = pendingJobsResponse[jobId];
  const jobData = { jobType, status: JOB_OPEN };
  updateJob(jobData, jobId);
};

export const signInUserAsync = ({
  email,
  password,
  anonymousUser = {},
  noPersistance = false
}) => {
  return dispatch => {
    dispatch(usersIsLoading(true));
    return signInUser(email, password, noPersistance)
      .then(payload => {
        const { user } = payload;

        return getUserNode(user)
          .then(userSnapshot => {
            const userInfo = userSnapshot.val();
            if (userInfo.userType === CONSUMER_USER_TYPE) {
              const { favoriteList = {} } = anonymousUser;
              const timestamp = new Date().getTime();
            Object.keys(favoriteList).map(prop => { // eslint-disable-line
                favoriteList[prop] = timestamp;
                userInfo.favoriteListings = {
                  ...userInfo.favoriteListings,
                  [prop]: timestamp
                };
              });
              const newFavoriteListings = { ...userInfo.favoriteListings };
              updateAnonymousUserFavoriteList({
                uid: user.uid,
                favoriteList: newFavoriteListings
              });
              fetchAllConsumerPendingJobs(user.uid).then(
                response =>
                  Object.keys(response).length &&
                  updateSignUpJob({ pendingJobsResponse: response })
              );
            }
            return dispatch(loginUserSuccess(payload.user, userInfo));
          })
          .then(() =>
            getAvatarImageUrl({ userId: user.uid })
              .then(url => {
                return dispatch(setUserAvatarUrl({ payload: url }));
              })
              .catch(() => {
                //user does not have avatar
              })
          );
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
        return Promise.reject(error);
      });
  };
};

export const getSignedInUserNode = user => {
  return dispatch => {
    getUserNode(user)
      .then(userSnapshot => {
        dispatch(loginUserSuccess(user, userSnapshot.val()));
        getAvatarImageUrl({ userId: user.uid })
          .then(url => {
            dispatch(setUserAvatarUrl({ payload: url }));
          })
          .catch(() => {
            //user does not have avatar
          });
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
};

export const resetUserPasswordAsync = email => {
  return dispatch => {
    return resetUserPassword(email)
      .then(() => {
        dispatch(resetPassword(true));
      })
      .catch(err => {
        dispatch(resetPasswordFailure(err));
      });
  };
};

export const getAgentServicesAsync = userId => {
  return dispatch => {
    getAgentServicesSnapshot(userId)
      .then(snapshot => {
        dispatch(getAgentServicesSuccess(snapshot.val()));
      })
      .catch(err => {
        dispatch(getAgentServicesFailure(err));
      });
  };
};

export const updateCurrentUserPasswordAsync = (
  currentPassword,
  newPassword
) => {
  return dispatch => {
    return updateCurrentUserPassword(currentPassword, newPassword)
      .then(() => {
        return dispatch(updatePassword(true));
      })
      .catch(err => {
        return dispatch(updatePasswordFailure(err));
      });
  };
};

export const getAgentCommissionAsync = userId => {
  return dispatch => {
    getAgentCommissionSnapshot(userId)
      .then(snapshot => {
        dispatch(getAgentCommissionSuccess(snapshot.val()));
      })
      .catch(err => {
        dispatch(getAgentCommissionFailure(err));
      });
  };
};

export const updateCurrentUserProfileImageMobile = ({
  userId,
  image
}) => dispatch =>
  new Promise((resolve, reject) => {
    postAvatarImageMobile({ userId, base64Image: image })
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        dispatch(setUserAvatarUrl({ payload: url }));
        resolve(url);
      })
      .catch(reject);
  });

export const updateCurrentUserProfileAsync = user => {
  const { currentUser } = user;
  return dispatch => {
    return updateCurrentUserProfile(user)
      .then(() =>
        updateTimeZoneToCurrentBrowserTime({
          userId: currentUser.uid,
          userType: user.userType === AGENT_USER_TYPE ? AGENTS : CONSUMERS
        })
      )
      .then(() => {
        if (user.avatarImage) {
          postAvatarImage({
            userId: currentUser.uid,
            file: user.avatarImage.file
          }).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
              dispatch(setUserAvatarUrl({ payload: url }));
            });
          });
        }
        getUserNode(currentUser).then(userSnapshot => {
          dispatch(updateProfile(userSnapshot.val()));
        });
      })
      .catch(err => {
        dispatch(updateProfileFailure(err));
      });
  };
};

export const updateCurrentUserServicesAndCommissionsAsync = agentData => {
  return dispatch => {
    return updateCurrentUserServicesAndCommissions(agentData)
      .then(() => {
        getUserNode(getCurrentUser().currentUser).then(userSnapshot => {
          dispatch(updateServicesAndCommissions(userSnapshot.val()));
        });
      })
      .catch(err => {
        dispatch(updateServicesAndCommissionsFailure(err));
      });
  };
};

export const updateCurrentUserRegionAndPropertyTypeAsync = agentData => {
  return dispatch => {
    return updateCurrentUserRegionAndPropertyType(agentData)
      .then(() => {
        getUserNode(getCurrentUser().currentUser).then(userSnapshot => {
          dispatch(updateRegionAndPropertyType(userSnapshot.val()));
        });
      })
      .catch(err => {
        dispatch(updateRegionAndPropertyTypeFailure(err));
      });
  };
};

export const signOutAsync = () => {
  return dispatch => {
    dispatch(signOut());
  };
};

export const signOutMobileAsync = ({ preSignOutFunction }) => {
  return dispatch => {
    return signOutUser({ preSignOutFunction })
      .then(() => {
        dispatch(signOut());
      })
      .catch(error => {
        dispatch(signOutFailure(error));
      });
  };
};

export const setFavoritePropertyAsync = (uid, listing) => {
  return dispatch => {
    const [listingId, provinceOrState] = listing;
    setFavoriteProperty(uid, listingId, provinceOrState)
      .then(() => {
        dispatch(setPropertyAsFavoriteSuccess(listingId));
        dispatch(getUsersFavoriteListingsAsync({ userId: uid }));
      })
      .catch(error => {
        dispatch(setPropertyAsFavoriteFailure(error));
      });
  };
};

export const removeFavoritePropertyAsync = (uid, creaId) => {
  return dispatch => {
    removeFavoriteProperty(uid, creaId)
      .then(() => {
        dispatch(removePropertyAsFavoriteSuccess(creaId));
        dispatch(getUsersFavoriteListingsAsync({ userId: uid }));
      })
      .catch(error => {
        dispatch(removePropertyAsFavoriteFailure(error));
      });
  };
};

export const getUsersFavoriteListingsAsync = ({ userId }) => dispatch => {
  getUsersFavoriteListings({ userId })
    .then(snapshot => {
      dispatch(getUsersFavoriteListingsSuccess({ payload: snapshot.val() }));
    })
    .catch(error => {
      dispatch(getUsersFavoriteListingsFailure({ error }));
    });
};

export const setReverseGeolocationAsync = (lat, long) => {
  return dispatch => {
    return axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=${GOOGLE_MAPS_API_KEY}`
      )
      .then(response => {
        return dispatch(
          setReverseGeolocationSuccess(response.results[0].formatted_address)
        );
      })
      .catch(error => {
        return dispatch(setReverseGeolocationError(error));
      });
  };
};

export const onAuthStateChange = () => {
  return dispatch => {
    dispatch(usersIsLoading(true));
    authStateChange()
      .then(user => {
        user
          ? dispatch(getSignedInUserNode(user))
          : dispatch(usersIsLoading(false));
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
};

export const getAgentAverageRating = ({ agentId }) => {
  return dispatch => {
    getAgentRatingsForAgentId({ agentId })
      .then(agentRatingSnapshot => {
        const averageRating = getAverageAgentRating({
          ratingDataObj: agentRatingSnapshot.val()
        });
        dispatch(getAgentAverageRatingSuccss(averageRating));
      })
      .catch(err => {
        dispatch(getAgentAverageRatingFailure(err));
      });
  };
};

export const getUsersAgreementStatusesAsync = ({
  userId,
  userType
}) => dispatch => {
  return getUserAgreementsStatus({ userId, userType })
    .then(resp => {
      return dispatch(getUsersAgreementStatusesSucc(resp));
    })
    .catch(err => {
      return dispatch(getUsersAgreementStatusesFail(err));
    });
};

export const resendVerificationEmail = () => dispatch => {
  return resendEmailVerification()
    .then(() => {
      dispatch(resendVerificationEmailSuccess());
    })
    .catch(err => {
      dispatch(resendVerificationEmailFail(err));
    });
};

export const clearResendVerificationEmailSuccessStatus = () => dispatch =>
  dispatch(clearResendVerificationStatus());

export const reloadUserAsync = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(reloadUserLoading());
    reloadUser()
      .then(() => {
        dispatch(reloadUserSuccess(getCurrentUser().currentUser));
        resolve(getCurrentUser().currentUser);
      })
      .catch(err => {
        dispatch(reloadUserFailure(err));
        reject(err);
      });
  });
};

export const updateStandardBuyOffer = ({ agentData }) => {
  return dispatch => {
    return updateCurrentUserStandardBuyOffer({ agentData })
      .then(() => {
        dispatch(updateStandardBuyOfferSuccess({ agentData }));
      })
      .catch(err => {
        dispatch(updateStandardBuyOfferFailure(err));
      });
  };
};

export const updateStandardSellOffer = ({ agentData }) => {
  return dispatch => {
    return updateCurrentUserStandardSellOffer({ agentData })
      .then(() => {
        dispatch(updateStandardSellOfferSuccess({ agentData }));
      })
      .catch(err => {
        dispatch(updateStandardSellOfferFailure(err));
      });
  };
};

export const updateCurrentUsersEmailThunk = ({
  email,
  password,
  userId,
  userType
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return updateUsersEmail({ email, password })
    .then(() =>
      updateCurrentUserProfileForKey({
        userId,
        key: EMAIL,
        value: email,
        userType
      })
    )
    .then(() => updateTimeZoneToCurrentBrowserTime({ userId, userType }))
    .then(() => getUserProfileById({ userId, userType }))
    .then(snapshot => dispatch(updateProfile(snapshot.val())))
    .catch(error => dispatch(updateProfileFailure(error)));
};

export const updateCurrentUserProfileForKeyThunk = ({
  userId,
  key,
  value,
  userType
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return updateCurrentUserProfileForKey({ userId, key, value, userType })
    .then(() => updateTimeZoneToCurrentBrowserTime({ userId, userType }))
    .then(() => getUserProfileById({ userId, userType }))
    .then(snapshot => {
      if (key === FIRST_NAME || key === LAST_NAME) {
        const { firstName, lastName } = snapshot.val();
        const name = `${firstName} ${lastName}`;

        return saveDisplayName({ resolveItem: snapshot, name });
      } else {
        return Promise.resolve(snapshot);
      }
    })
    .then(snapshot => dispatch(updateProfile(snapshot.val())))
    .catch(error => dispatch(updateProfileFailure(error)));
};

export const updateMarketingValueForUserThunk = ({
  userId,
  key,
  value,
  userType
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return updateMarketingValueForUser({ userId, key, value, userType })
    .then(() => dispatch(updateMarketingValueForUserSuccess({ key, value })))
    .catch(error =>
      dispatch(updateMarketingValueForUserFailure({ error: error }))
    );
};

export const updateNotificationSettingThunk = ({
  key,
  value,
  userId,
  userType
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return updateNotificationSetting({ key, value, userId, userType })
    .then(() =>
      dispatch(
        updateNotificationSettingSuccess({
          notificationKey: key,
          notificationValue: value
        })
      )
    )
    .catch(error => dispatch(updateNotificationSettingFailure({ error })));
};

export const updateCurrentUserRegionsThunk = ({
  selectedPolygons
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return updateCurrentUserRegions({ selectedPolygons })
    .then(() => dispatch(updateCurrentUserRegionsSuccess({ selectedPolygons })))
    .catch(error => dispatch(updateCurrentUserRegionsFailure({ error })));
};

export const getCurrentUserLicenseImage = ({ userId }) => dispatch =>
  getLicenseImageUrl({ userId })
    .then(url => {
      dispatch(getUserLicenseImageUrlSuccess({ payload: url }));
    })
    .catch(error =>
      dispatch(getUserLicenseImageUrlFailure({ payload: error }))
    );

export const updateCurrentUserLicenseImageMobile = ({
  userId,
  image
}) => dispatch =>
  new Promise((resolve, reject) =>
    postLicenseImageMobile({
      userId,
      base64Image: image
    })
      .then(() => dispatch(updateCurrentUserLicenseImageMobileSuccess()))
      .then(() => resolve(dispatch(getCurrentUserLicenseImage({ userId }))))
      .catch(error => {
        reject(error);
        dispatch(
          updateCurrentUserLicenseImageMobileFailure({ payload: error })
        );
      })
  );

export const addAgentVerificationDataAsync = ({
  verificationData
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return addAgentVerificationDataReturnUser({
    verificationData
  })
    .then(agentData => {
      dispatch(saveCurrentUserSuccess(agentData));

      // Upload images
      const userId = agentData.uid;
      const { licenseImage = {}, avatarImage = {} } = verificationData;

      if (licenseImage.file || avatarImage.file) {
        const promises = [];
        if (licenseImage.file) {
          promises.push(postLicenseImage(userId, licenseImage.file));
        }
        if (avatarImage.file) {
          promises.push(
            postAvatarImage(userId, avatarImage.file)
              .then(() => getAvatarImageUrl({ userId }))
              .then(url => dispatch(setUserAvatarUrl({ payload: url })))
          );
        }

        return Promise.all(promises);
      } else {
        return Promise.resolve();
      }
    })
    .then(() =>
      dispatch(addVerificationDataSuccess({ payload: verificationData }))
    )
    .catch(error => dispatch(addVerificationDataFailure(error)));
};

export const updateAgentVerificationDataAsync = ({
  verificationData
}) => dispatch => {
  dispatch(usersIsLoading(true));
  return updateAgentVerificationData({
    verificationData
  })
    .then(({ agentProfile, agentVerification }) =>
      dispatch(
        addVerificationDataSuccess({
          payload: { ...agentProfile, ...agentVerification }
        })
      )
    )
    .catch(error => dispatch(addVerificationDataFailure(error)));
};

export const updateAgentVerificationMobileAsync = ({
  values,
  agentId
}) => dispatch =>
  updateAgentVerification({ agentId, values })
    .then(() =>
      dispatch(
        addVerificationDataSuccess({
          payload: values
        })
      )
    )
    .catch(error => dispatch(addVerificationDataFailure(error)));
