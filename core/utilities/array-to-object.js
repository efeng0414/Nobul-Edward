const createObjectFromArray = array => {
  let object = {};
  if (array && array.length > 0) {
    array.forEach(element => {
      object[element] = true;
    });
  }
  return object;
};

export { createObjectFromArray };
