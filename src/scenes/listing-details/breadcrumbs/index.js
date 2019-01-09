import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { url } from "../../../routes/routes";

const Breadcrumbs = ({ prevHref, prevHrefReadable, listingId }) => (
  <Breadcrumb separator=">">
    <Breadcrumb.Item>
      <Link to={prevHref}>{prevHrefReadable}</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>#{listingId}</Breadcrumb.Item>
  </Breadcrumb>
);

Breadcrumbs.propTypes = {
  prevHref: PropTypes.string.isRequired,
  listingId: PropTypes.string.isRequired,
  prevHrefReadable: PropTypes.string.isRequired
};

export default Breadcrumbs;
