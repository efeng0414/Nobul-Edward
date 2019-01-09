import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

const mapStateToProps = state => {
  const { language, messages } = state.locale;
  return {
    locale: language,
    key: language,
    messages
  };
};

export default connect(mapStateToProps)(IntlProvider);
