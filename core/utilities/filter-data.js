const filterIn = ({ entities, key, databaseKey, filterValues }) =>
  filterValues.includes(entities[key][databaseKey]);

const filterOut = ({ entities, key, databaseKey, filterValues }) =>
  !filterValues.includes(entities[key][databaseKey]);

const filterByMultipleValues = ({
  filterValues,
  entities,
  databaseKey,
  shouldFilterOut = false
}) => {
  if (!entities) return {};
  return Object.keys(entities)
    .filter(
      key =>
        shouldFilterOut
          ? filterOut({ entities, key, databaseKey, filterValues })
          : filterIn({ entities, key, databaseKey, filterValues })
    )
    .reduce((currentList, key) => {
      return {
        ...currentList,
        [key]: entities[key]
      };
    }, {});
};

export { filterByMultipleValues };
