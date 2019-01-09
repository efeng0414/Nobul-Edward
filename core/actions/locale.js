import { LOCALE_SELECTED } from "../types/locale";

const updateLocale = function(locale) {
  return {
    type: LOCALE_SELECTED,
    locale
  };
};

export { updateLocale };
