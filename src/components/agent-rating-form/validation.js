export const VALIDATION_MAP = {
  FAIL: 0,
  PASS: 1,
  INITIAL: 2
};

export const validateTextInput = ({ textInput }) =>
  textInput.length > 0 ? VALIDATION_MAP.PASS : VALIDATION_MAP.FAIL;
