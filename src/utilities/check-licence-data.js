// TODO:
// - perhaps check the status
// - or add a new flag "hasUploadedPhoto" to
// the database and check thats

export const checkLicenceData = ({ verification }) =>
  !!(
    verification &&
    Object.keys(verification).length > 0 &&
    verification.licenseNumber &&
    verification.status
  );
