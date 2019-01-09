import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

import axios from "axios";
import { parseMasterList } from "../utilities/listings";

import { PROPERTY_FILES, PROPERTY_IMAGES } from "../api-transform";
import { transformListing } from "../utilities/listing-transform";
import { PROVINCES } from "../data/provinces";

const DEFAULT_PROVINCE_OR_STATE = "ON";

// TODO: To API call in new branch.
const fetchSingleListingDetails = (
  listingId,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const listingProvince =
    PROVINCES.find(p => p.code === provinceOrState) ||
    PROVINCES.find(p => p.code === DEFAULT_PROVINCE_OR_STATE);
  const listingDataBucket = listingProvince.listingBucketName;

  return new Promise((resolve, reject) => {
    if (!listingDataBucket) {
      reject({ error: `No listing feed for ${provinceOrState}` });
    }

    // Change this to API call. Only reject if we can't find what we need.
    firebase
      .app()
      .storage(listingDataBucket)
      .ref(`${PROPERTY_FILES}/${listingId}.json`)
      .getDownloadURL()
      .then(url => {
        axios({ method: "get", url: url })
          .then(response => {
            resolve({
              [listingId]: transformListing({
                provinceOrState: listingProvince.code,
                listing: response.data
              })
            });
          })
          .catch(() => {
            resolve();
          });
      })
      .catch(() => {
        resolve();
      });
  });
};

//This function can recive an array of listingIds, ie - [123, 456]
// Or it can receive an array of arrays in this form - [[123, "ON"], [456, "FL"]]
const fetchMultipleListingDetails = (
  listingIds,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const listingPromises = listingIds.map(listing => {
    if (Array.isArray(listing)) {
      const [id, pOrS] = listing;
      return fetchSingleListingDetails(id, pOrS);
    } else {
      return fetchSingleListingDetails(listing, provinceOrState);
    }
  });
  return Promise.all(listingPromises);
};

const fetchSingleFeatureImageUrl = (
  listingId,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const listingProvince =
    PROVINCES.find(p => p.code === provinceOrState) ||
    PROVINCES.find(p => p.code === DEFAULT_PROVINCE_OR_STATE);
  const listingDataBucket = listingProvince.listingBucketName;

  return new Promise((resolve, reject) => {
    if (!listingDataBucket) {
      reject({ error: `No listing feed for ${provinceOrState}` });
    }
    firebase
      .app()
      .storage(listingDataBucket)
      .ref(`${PROPERTY_IMAGES}/${listingId}/1.jpg`)
      .getDownloadURL()
      .then(url => resolve({ [listingId]: { featureImageUrl: url } }))
      .catch(() => {
        resolve();
      });
  });
};

const fetchSingleDetailsAndFeatureImages = (
  listingId,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const detailsPromise = fetchSingleListingDetails(listingId, provinceOrState);
  const imagePromise = fetchSingleFeatureImageUrl(listingId, provinceOrState);
  return new Promise(resolve => {
    Promise.all([detailsPromise, imagePromise])
      .then(([listingDetails, featureImageUrl]) => {
        const data =
          featureImageUrl && featureImageUrl[listingId].featureImageUrl
            ? { ...listingDetails[listingId], ...featureImageUrl[listingId] }
            : listingDetails[listingId];
        resolve(data);
      })
      .catch(resolve);
  });
};

//This function can recive an array of listingIds, ie - [123, 456]
// Or it can receive an array of arrays in this form - [[123, "ON"], [456, "FL"]]
const fetchMultipleFeatureImageUrls = (
  listingIds,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const urlPromises = listingIds.map(listing => {
    if (Array.isArray(listing)) {
      const [id, pOrS] = listing;
      return fetchSingleFeatureImageUrl(id, pOrS);
    } else {
      return fetchSingleFeatureImageUrl(listing, provinceOrState);
    }
  });
  return Promise.all(urlPromises);
};

const fetchMultipleDetailsAndFeatureImages = (
  listingIds,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  return new Promise(resolve => {
    const detailsPromises = fetchMultipleListingDetails(
      listingIds,
      provinceOrState
    );

    //TODO: Change this to accept an array of arrays, each with a listing ID and the region
    const urlPromises = fetchMultipleFeatureImageUrls(
      listingIds,
      provinceOrState
    );

    Promise.all([detailsPromises, urlPromises]).then(
      ([detailsArray, urlsArray]) => {
        const details = detailsArray.filter(detail => {
          return detail; // filter out undefined
        });
        const urls = urlsArray.filter(url => {
          return url; // filter out undefined
        });

        const urlsObject = {};
        urls.forEach(url => {
          const [listingId] = Object.keys(url);
          urlsObject[listingId] = url[listingId];
        });
        const listingsWithImageUrls = [];
        details.forEach(detail => {
          const [listingId] = Object.keys(detail);
          listingsWithImageUrls.push({
            ...detail[listingId],
            ...urlsObject[listingId]
          });
        });
        resolve(listingsWithImageUrls);
      }
    );
  });
};

const fetchAndParseMasterlist = (
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const listingProvince =
    PROVINCES.find(p => p.code === provinceOrState) ||
    PROVINCES.find(p => p.code === DEFAULT_PROVINCE_OR_STATE);
  const listingDataBucket = listingProvince.listingBucketName;

  return new Promise((resolve, reject) => {
    if (!listingDataBucket) {
      reject({ error: `No listing feed for ${provinceOrState}` });
    }
    firebase
      .app()
      .storage(listingDataBucket)
      .ref("masterlist.txt")
      .getDownloadURL()
      .then(url => {
        axios({ method: "get", url: url })
          .then(response => {
            const results = parseMasterList(response.data);
            resolve(results);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

const getPhotosForProperty = (
  listingId,
  startVal,
  endVal,
  provinceOrState = DEFAULT_PROVINCE_OR_STATE
) => {
  const listingProvince =
    PROVINCES.find(p => p.code === provinceOrState) ||
    PROVINCES.find(p => p.code === DEFAULT_PROVINCE_OR_STATE);
  const listingDataBucket = listingProvince.listingBucketName;

  return new Promise(resolve => {
    const photoRef = firebase
      .app()
      .storage(`gs://${listingDataBucket}`)
      .ref(`/property-images/${listingId}/`);
    let urls = [];
    for (let i = startVal; i <= endVal; i++) {
      photoRef
        .child(`${i}.jpg`)
        .getDownloadURL()
        .then(url => {
          urls.push(url);
          if (i >= endVal) {
            resolve(urls);
          }
        })
        .catch(err => {
          if (i >= endVal) {
            resolve(urls);
          }
        });
    }
  });
};

export {
  fetchAndParseMasterlist,
  fetchSingleListingDetails,
  fetchMultipleListingDetails,
  fetchSingleFeatureImageUrl,
  fetchSingleDetailsAndFeatureImages,
  fetchMultipleFeatureImageUrls,
  fetchMultipleDetailsAndFeatureImages,
  getPhotosForProperty
};
