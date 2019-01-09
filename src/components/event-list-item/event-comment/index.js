import React from "react";
import PropTypes from "prop-types";
import CommentIcon from "react-icons/lib/fa/comment-o";

const EventComment = ({ comment }) => (
  <div className="event-details-item event-details-item--comment">
    <CommentIcon />
    <span className="item-value">{comment}</span>
  </div>
);

EventComment.propTypes = {
  comment: PropTypes.string.isRequired
};

export default EventComment;
