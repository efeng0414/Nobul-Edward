export const resetProperty = ({ object, key, value }) => {
  Object.defineProperty(object, key, {
    value,
    enumerable: true,
    configurable: true,
    writable: true
  });
};
