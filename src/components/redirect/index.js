import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { url } from "../../routes/routes";
import { redirectAliases } from "../../routes/redirectAliases";
import { PropTypes } from "prop-types";
import { gtmEvent } from "../../utilities/gtm-event";

const Redirector = props => {
  const route = redirectAliases[props.match.params.page];

  // Go to error route if not recognized
  if (!route) {
    return <Redirect to={url.error} />;
  }

  // Set GTM event
  route.GTM_EVENT && gtmEvent({ name: route.GTM_EVENT });

  // Go to page
  if (route.path.indexOf("http") === 0) {
    window.location = route.path;
    return null;
  } else {
    return <Redirect to={route.path} />;
  }
};

Redirector.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Redirector);
