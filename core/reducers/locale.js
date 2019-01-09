import { UPDATE_LOCALES } from "../types/locale";
import { ENGLISH_TRANSLATION } from "../locale/en";
import { SPANISH_TRANSLATION } from "../locale/es";

const defaultState = {
  language: ENGLISH_TRANSLATION.language,
  messages: ENGLISH_TRANSLATION.messages
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LOCALES:
      switch (action.locale) {
        case "es":
          return {
            ...state,
            language: SPANISH_TRANSLATION.language,
            messages: SPANISH_TRANSLATION.messages
          };
        default:
          return {
            ...state,
            language: ENGLISH_TRANSLATION.language,
            messages: ENGLISH_TRANSLATION.messages
          };
      }
    default:
      return state;
  }
};
