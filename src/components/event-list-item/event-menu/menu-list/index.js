import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";

const MenuList = ({ handleDeleteClick }) => (
  <Menu className="event-menu-list">
    <Menu.Item onClick={handleDeleteClick}>Delete</Menu.Item>
  </Menu>
);

MenuList.propTypes = {
  handleDeleteClick: PropTypes.func.isRequired
};

export default MenuList;
