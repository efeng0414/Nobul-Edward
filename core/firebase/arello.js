import axios from "axios";

const findArelloLicence = (jurisdiction, licenseNumber, lastName) => {
  const arelloURL = `${process.env.FIREBASE_FUNCTIONS_BASE_URL}/findLicense`;

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: arelloURL, //"https://us-central1-nobul-dev-2.cloudfunctions.net/findLicense",
      data: {
        jurisdiction,
        licenseNumber,
        lastName
      },
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export { findArelloLicence };
