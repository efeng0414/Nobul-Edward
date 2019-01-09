import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { IntlProvider, intlShape } from "react-intl";
import { ENGLISH_TRANSLATION } from "../../core/locale/en";
import { cloneFunction } from "../utilities/clone-function";
import { resetProperty } from "../utilities/reset-property";

global.renderer = renderer;
Enzyme.configure({ adapter: new Adapter() });

global.Enzyme = Enzyme;

global.intl = { locale: "en", messages: ENGLISH_TRANSLATION.messages };

global.getIntl = () => {
  return new IntlProvider(
    { locale: "en", messages: ENGLISH_TRANSLATION.messages },
    {}
  ).getChildContext().intl;
};

global.getCustomIntl = messages => {
  return new IntlProvider({ locale: "en", messages }, {}).getChildContext()
    .intl;
};

global.getIntlContext = ({ intl }) => ({
  context: { intl },
  childContextTypes: { intl: intlShape.isRequired }
});

global.createComponentPrototypeResets = ({ component }) => (
  accumulator,
  key
) => ({
  ...accumulator,
  [key]: cloneFunction({
    fn: component.prototype[key]
  })
});

global.resetPropertyComponentProperty = ({
  component,
  componentMount,
  componentPrototypeResets
}) => key => {
  resetProperty({
    object: component.prototype,
    key,
    value: componentPrototypeResets[key]
  });
  componentMount.instance()[key] = component.prototype[key].bind(
    componentMount.instance()
  );
};
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
