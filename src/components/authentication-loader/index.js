import React from "react";
import ActivityIndicator from "../activity-indicator";
import "./styles.scss";

const AuthenticationLoader = () => (
  <ActivityIndicator spinning type="Loading">
    <div className="loading-page" />
  </ActivityIndicator>
);

export default AuthenticationLoader;
