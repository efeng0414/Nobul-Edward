import React from "react";
import PropTypes from "prop-types";
import {
  PARKING_ICON,
  LOCKER_ICON,
  POOL_ICON,
  PARTY_ROOM_ICON,
  GYM_ICON,
  LAUNDRY_ICON
} from "../../../utilities/images";

const ParkingIcon = ({ width }) => <img style={{ width }} src={PARKING_ICON} />;

const LockerIcon = ({ width }) => <img style={{ width }} src={LOCKER_ICON} />;

const PoolIcon = ({ width }) => <img style={{ width }} src={POOL_ICON} />;

const PartyRoomIcon = ({ width }) => (
  <img style={{ width }} src={PARTY_ROOM_ICON} />
);

const GymIcon = ({ width }) => <img style={{ width }} src={GYM_ICON} />;

const LaundryIcon = ({ width }) => <img style={{ width }} src={LAUNDRY_ICON} />;

export {
  ParkingIcon,
  LockerIcon,
  PoolIcon,
  PartyRoomIcon,
  GymIcon,
  LaundryIcon
};
