import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import { SHARE_ICON, TAG_ICON } from "../../../utilities/images";
import { CONSUMER_USER_TYPE } from "../../../../core/constants/users";

const ListingOptions = ({
  isFavorite,
  onFavoriteFillClick,
  onFavoriteOutlineClick,
  tagListingOnClick,
  onShareIconClick,
  isTagged,
  userType
}) => {
  const isTaggedClass = isTagged ? "isTagged" : "";
  const isAgent = userType && userType !== CONSUMER_USER_TYPE;
  return (
    <div className="listing-options">
      <img
        src={SHARE_ICON}
        className="listing-options-icon"
        onClick={onShareIconClick}
      />
      {isFavorite ? (
        <Icon
          type="heart"
          className="listing-card-heart-red listing-options-icon"
          onClick={onFavoriteFillClick}
        />
      ) : (
        <Icon
          type="heart-o"
          className="listing-options-icon"
          onClick={onFavoriteOutlineClick}
        />
      )}
      {!isAgent && (
        <img
          src={TAG_ICON}
          className={`listing-options-icon ${isTaggedClass}`}
          onClick={tagListingOnClick}
        />
      )}
    </div>
  );
};

ListingOptions.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteFillClick: PropTypes.func.isRequired,
  onShareIconClick: PropTypes.func.isRequired,
  onFavoriteOutlineClick: PropTypes.func.isRequired,
  tagListingOnClick: PropTypes.func.isRequired,
  isTagged: PropTypes.bool.isRequired,
  userType: PropTypes.string
};
export default ListingOptions;
