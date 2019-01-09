// Helper function to toggle on and off all neighborhoods of the polygon data.
// This is only used to turn on/off Toronto polygons at the moment.
export const toggleSelectedNeighborhoodsHelper = ({
  selectAll,
  mapPolygons,
  currentPolygons,
  setPolygons
}) => {
  const neighbourhoods = mapPolygons ? mapPolygons.neighbourhoods.features : [];

  if (selectAll) {
    const selectedPolygons = {};

    neighbourhoods.map(
      polygon =>
        (selectedPolygons[polygon.properties.polygonId] = {
          name: polygon.properties.name,
          provinceOrState: polygon.properties.provinceOrState,
          country: polygon.properties.country
        })
    );

    setPolygons({
      ...currentPolygons,
      ...selectedPolygons
    });
  } else {
    const selectedPolygons = { ...currentPolygons };
    neighbourhoods.map(
      polygon => delete selectedPolygons[polygon.properties.polygonId]
    );
    setPolygons(selectedPolygons);
  }
};

const neighborhoodsPolygonsMap = new WeakMap();

export const allNeighborhoodsSelected = ({ mapPolygons, currentPolygons }) => {
  if (!mapPolygons || !mapPolygons.neighbourhoods) {
    return false; // No neighborhoods to be selected.
  }

  let neighborhoodPolygonIds = mapPolygons
    ? neighborhoodsPolygonsMap.get(mapPolygons)
    : null;

  if (!neighborhoodPolygonIds) {
    const neighbourhoods = mapPolygons.neighbourhoods.features;
    neighborhoodPolygonIds = neighbourhoods.map(
      polygon => polygon.properties.polygonId
    );
    neighborhoodsPolygonsMap.set(mapPolygons);
  }

  const selectedPolygonIds = Object.keys(currentPolygons);
  if (selectedPolygonIds.length < neighborhoodPolygonIds.length) {
    return false; // If there are less polygons selected than neighborhoods, they sure arent all selected.
  }

  // Check if all neighborhood IDs are included in selectedPolygonIds
  return neighborhoodPolygonIds.every(
    elem => selectedPolygonIds.indexOf(elem) > -1
  );
};

// Check for Toronto, show/hide city button. Will change to generic in future.
export const showCityCheckbox = ({ placesApiResult }) => {
  return (
    placesApiResult.address_components &&
    placesApiResult.address_components[0].short_name === "Toronto"
  );
};
