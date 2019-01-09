export const cloneFunction = ({ fn }) => {
  const clone = function clone(...args) {
    return fn.apply(this, args);
  };
  [...fn].map(key => {
    clone[key] = fn[key];
  });
  return fn;
};
