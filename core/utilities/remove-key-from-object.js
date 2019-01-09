export const removeKeyFromObject = ({ key, object }) => {
  const { [key]: deletedValue, ...newObject } = object; // eslint-disable-line no-unused-vars
  return newObject;
};
