const onlyOnce = ({ fn }) => {
  let fired = false;
  return args => {
    !fired && fn(args);
    fired = true;
  };
};

export default onlyOnce;
