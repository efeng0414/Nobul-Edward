import React from "react";
import { Card, Rate } from "antd";
import PropTypes from "prop-types";
import "./styles.scss";

const AboutAgentCard = ({ agentImage, agentRating, agentName, brokerage }) => (
  <Card className="about-agent-card">
    <h2>About this agent</h2>
    <div className="flex">
      <div className="about-agent-card-grid-item">
        <img
          src={agentImage}
          alt="Agent Image"
          className="about-agent-card-profile-image"
        />
      </div>
      <div className="about-agent-card-grid-item">
        <p>{agentName}</p>
        <p className="about-agent-card-brokerage">{brokerage}</p>
      </div>
    </div>
  </Card>
);

AboutAgentCard.propTypes = {
  agentImage: PropTypes.string.isRequired,
  agentRating: PropTypes.number.isRequired,
  agentName: PropTypes.string.isRequired,
  brokerage: PropTypes.string.isRequired
};

export default AboutAgentCard;
