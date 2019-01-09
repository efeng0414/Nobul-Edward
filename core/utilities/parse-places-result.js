export const parseAddressParts = address => {
  const transform = {
    streetNumber: "street_number",
    streetName: "route",
    neighbourhoodOrSublocality: [
      "neighborhood",
      "sublocality",
      "administrative_area_level_3"
    ],
    city: "locality",
    provinceOrState: "administrative_area_level_1",
    region: "administrative_area_level_2",
    country: "country",
    postalOrZip: "postal_code"
  };

  const parsed = {};

  address.forEach(item => {
    Object.entries(transform).forEach(addressPart => {
      if (addressPart[1] instanceof Array) {
        addressPart[1].forEach(type => {
          if (item.types.includes(type)) {
            parsed[addressPart[0]] = item.long_name;
          }
        });
      } else if (item.types.includes(addressPart[1])) {
        parsed[addressPart[0]] = item.long_name;
      }
    });
  });
  return parsed;
};

export const getProvinceOrStateFromPlaces = result => {
  const parts = result.address_components;

  const provinceOrState = parts
    .filter(({ types }) => types.includes("administrative_area_level_1"))
    .reduce((accum, { short_name }) => short_name, "");//eslint-disable-line
  return provinceOrState;
};
