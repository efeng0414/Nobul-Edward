import axios from "axios";
import {
  updateAgreement,
  createNewAgreement,
  getAgreement,
  getBlankFormPDFUrl,
  getBlankFormList,
  startSendEnvelope,
  getOfferAgreements
} from "../firebase/agreements";

import { getUserProfileById, getAgentUserNode } from "../firebase/users";
import { fetchOfferById } from "../firebase/offers";

import { CONSUMERS } from "../api-transform";

import {
  createAgreementSuccess,
  createAgreementFailure,
  getAgreementSuccess,
  agreementGetFailure,
  getAgreementPDFUrlSuccess,
  getAgreementPDFUrlFailure,
  getFormListSuccess,
  getFormListFailure,
  agreementLoading,
  sendEnvelopeSuccess,
  sendEnvelopeFailure,
  viewAgreementSuccess,
  viewAgreementFailure,
  getFormList
} from "../actions/agreements";

import { fetchOfferSuccess } from "../actions/offers";
import { SIGNED } from "../constants/shared";
import { fetchJobDetailById } from "../firebase/jobs";
import { constructAddressString } from "../utilities/agreements";

const startSendEnvelopeAsync = ({ offerId, offerType }) => {
  return dispatch => {
    dispatch(agreementLoading({ isLoading: true }));
    return new Promise((resolve, reject) =>
      startSendEnvelope({ offerId, offerType })
        .then(result => {
          dispatch(sendEnvelopeSuccess(result));
          return resolve();
        })
        .catch(error => {
          dispatch(sendEnvelopeFailure(error));
          return reject(error);
        })
    );
  };
};

const getBlankFormListAsync = (country, region) => {
  return dispatch => {
    dispatch(getFormList());
    return getBlankFormList(country, region)
      .then(result => {
        dispatch(getFormListSuccess(result));
      })
      .catch(error => {
        dispatch(getFormListFailure(error));
      });
  };
};

const getBlankFormPDFUrlAsync = storagePath => {
  return dispatch => {
    return storagePath
      ? getBlankFormPDFUrl(storagePath)
          .then(result => {
            dispatch(getAgreementPDFUrlSuccess(result));
          })
          .catch(error => {
            dispatch(getAgreementPDFUrlFailure(error));
          })
      : dispatch(getAgreementPDFUrlFailure());
  };
};

const getLatestAgreement = (offerId, agreementType) => {
  return fetchOfferById(offerId).then(offer => {
    const { agreements } = agreements ? offer : {};
    const agreementId = agreements ? agreements[agreementType] : false;

    if (!agreementId) {
      return Promise.resolve(false);
    }

    return getAgreement(agreementType, agreementId);
  });
};

// Create the agreement, checking that it is not already signed.
// Overwrites existing agreement if it hasnt been sent to docusign
const createAgreementAsync = (postData, agreementType, fileToUpload) => {
  return dispatch => {
    dispatch(agreementLoading({ isLoading: true }));
    return new Promise((resolve, reject) =>
      getLatestAgreement(postData.offerId, agreementType).then(snapshot => {
        let writeAgreement = createNewAgreement;
        let agreementId = null;

        if (snapshot) {
          // Check if the agreement has been sent to docusign, or is rejected.
          const { signingStatus, signers } = snapshot.val();

          // We are trying to overwrite a signed document!!! NO.
          if (signingStatus === SIGNED) {
            dispatch(createAgreementFailure({}));
            return reject();
          }

          // If there are no signers, document hasnt been sent to docusign yet.
          if (!signers) {
            agreementId = snapshot.key; // Set agreement id
            writeAgreement = updateAgreement; // Set update action
          }
        }

        // Check agreementData for signingStatus;
        return writeAgreement({
          agreementKey: agreementId,
          agreementData: postData,
          fileBlob: fileToUpload,
          agreementType
        })
          .then(result => {
            dispatch(createAgreementSuccess(result));
            resolve();
          })
          .catch(error => {
            dispatch(createAgreementFailure(error));
            reject(error);
          });
      })
    );
  };
};

const agreementGetAsync = (agreementType, agreementId) => {
  return dispatch => {
    dispatch(agreementLoading({ isLoading: true }));
    return getAgreement(agreementType, agreementId)
      .then(result => {
        dispatch(getAgreementSuccess(agreementType, result.val(), agreementId));
      })
      .catch(error => {
        dispatch(agreementGetFailure(error));
      });
  };
};

const collectAgreementPrefillDataAsync = (agreementType, offerId) => {
  return dispatch => {
    dispatch(agreementLoading({ isLoading: true }));

    return fetchOfferById({ offerId })
      .then(offer => {
        const { consumerId, agentId, jobType, jobId } = offer;
        const agentPromise = getAgentUserNode({
          uid: agentId
        });

        const userPromise = getUserProfileById({
          userId: consumerId,
          userType: CONSUMERS
        });

        const agreementsPromise = getOfferAgreements({
          offerId,
          agreementType
        });

        const jobPromise = fetchJobDetailById({
          jobId
        });

        // Store that we have the offer.
        dispatch(fetchOfferSuccess(offer));

        return Promise.all([
          userPromise,
          agentPromise,
          agreementsPromise,
          jobPromise
        ]).then(
          ([userSnapshot, agentSnaptshot, agreementsSnapshot, jobData]) => {
            const userData = userSnapshot.val();
            const agentData = agentSnaptshot.val();
            const agreementsData = agreementsSnapshot.val() || {};
            const agentProfile = agentData.profile;

            const filledAgreement = {
              ...jobData,
              ...offer,
              agentName: `${agentProfile.firstName} ${agentProfile.lastName}`,
              brokerageName: agentData.verification.brokerageName,
              brokeragePhone:
                agentData.verification.brokeragePhone ||
                agentData.profile.brokeragePhone,
              brokerageAddress: constructAddressString(agentData.profile),
              agentPhone: agentProfile.phone,
              clientAddress: constructAddressString(userData),
              clientPhone: userData.phone,
              clientName: `${userData.firstName} ${userData.lastName}`,
              offerId: offerId,
              jobType: jobType,
              country: agentProfile.country,
              region: agentProfile.provinceOrState,
              propertyAddress: jobData && jobData.address,
              price: jobData && jobData.priceRangeHigh,
              agreementsCount: Object.keys(agreementsData).length
            };

            dispatch(getAgreementSuccess(agreementType, filledAgreement));
          }
        );
      })
      .catch(error => {
        dispatch(agreementGetFailure(error));
      });
  };
};

const viewAgreementAsync = ({ agreementData }) => {
  const agreementUrl = `${
    process.env.FIREBASE_FUNCTIONS_BASE_URL
  }/viewingDocuments`;

  return dispatch => {
    dispatch(agreementLoading({ isLoading: true }));

    return new Promise((resolve, reject) => {
      axios
        .post(agreementUrl, agreementData)
        .then(response => {
          if (response.data.success) {
            dispatch(viewAgreementSuccess(response.data.url));
            resolve();
          } else {
            reject();
          }
        })
        .catch(error => {
          dispatch(viewAgreementFailure(error));
          reject(error);
        });
    });
  };
};

export {
  createAgreementAsync,
  agreementGetAsync,
  collectAgreementPrefillDataAsync,
  getBlankFormPDFUrlAsync,
  getBlankFormListAsync,
  startSendEnvelopeAsync,
  viewAgreementAsync
};
