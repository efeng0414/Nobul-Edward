import {
  ICON_BEDROOM,
  ICON_BEDROOOM_1,
  ICON_BEDROOOM_2,
  ICON_BEDROOOM_3,
  ICON_BEDROOOM_4,
  ICON_BEDROOOM_5,
  ICON_BATHROOM,
  ICON_BATHROOM_1,
  ICON_BATHROOM_2,
  ICON_BATHROOM_3,
  ICON_BATHROOM_4,
  ICON_BATHROOM_5,
  BASEMENT_ICON,
  FIREPLACE_ICON,
  WASHROOM_ICON,
  STORAGE_ICON,
  ELEVATOR_ICON,
  PARKING_ICON,
  LOCKER_ICON,
  POOL_ICON,
  PARTY_ROOM_ICON,
  GYM_ICON,
  LAUNDRY_ICON,
  CONDO_BUY,
  CONDO_SELL,
  CONDO_GREY,
  HOUSE_BUY,
  HOUSE_SELL,
  HOUSE_GREY,
  COMMERCIAL_BUY,
  COMMERCIAL_SELL,
  COMMERCIAL_GREY,
  RECREATIONAL_BUY,
  RECREATIONAL_SELL,
  RECREATIONAL_GREY,
  OTHER_BUY,
  OTHER_SELL,
  OTHER_GREY,
  BASEMENT_ICON_SMALL,
  FIREPLACE_ICON_SMALL,
  POOL_ICON_SMALL,
  PARKING_ICON_SMALL,
  LOCKER_ICON_SMALL,
  LAUNDRY_ICON_SMALL,
  GYM_ICON_SMALL,
  PARTY_ROOM_ICON_SMALL,
  WASHROOM_ICON_SMALL,
  STORAGE_ICON_SMALL,
  ELEVATOR_ICON_SMALL,
  AIR_CON_ICON_SMALL,
  BALCONY_ICON_SMALL
} from "../utilities/images";

import {
  COMMERCIAL,
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  OTHER
} from "../../core/constants/listings";

import { PROPERTY_TYPES } from "../../core/data/propertyData";

export const CREATE_PROPERTY_TYPES = [
  {
    value: HOUSE_TOWNHOUSE,
    buy: HOUSE_BUY,
    sell: HOUSE_SELL,
    grey: HOUSE_GREY
  },
  {
    value: CONDO_APARTMENT,
    buy: CONDO_BUY,
    sell: CONDO_SELL,
    grey: CONDO_GREY
  },
  {
    value: RECREATIONAL,
    buy: RECREATIONAL_BUY,
    sell: RECREATIONAL_SELL,
    grey: RECREATIONAL_GREY
  },
  {
    value: COMMERCIAL,
    buy: COMMERCIAL_BUY,
    sell: COMMERCIAL_SELL,
    grey: COMMERCIAL_GREY
  },
  {
    value: OTHER,
    buy: OTHER_BUY,
    sell: OTHER_SELL,
    grey: OTHER_GREY
  }
];

export const PROPERTY_BEDROOMS = [
  { value: 0, icon: ICON_BEDROOM },
  { value: 1, icon: ICON_BEDROOOM_1 },
  { value: 2, icon: ICON_BEDROOOM_2 },
  { value: 3, icon: ICON_BEDROOOM_3 },
  { value: 4, icon: ICON_BEDROOOM_4 },
  { value: 5, icon: ICON_BEDROOOM_5 }
];

export const PROPERTY_BATHROOMS = [
  { value: 0, icon: ICON_BATHROOM },
  { value: 1, icon: ICON_BATHROOM_1 },
  { value: 2, icon: ICON_BATHROOM_2 },
  { value: 3, icon: ICON_BATHROOM_3 },
  { value: 4, icon: ICON_BATHROOM_4 },
  { value: 5, icon: ICON_BATHROOM_5 }
];

export const PROPERTY_CLASS_FEATURES = {
  [PROPERTY_TYPES[0].value]: [
    { value: "basement", icon: BASEMENT_ICON },
    { value: "fireplace", icon: FIREPLACE_ICON },
    { value: "pool", icon: POOL_ICON },
    { value: "parking", icon: PARKING_ICON }
  ],
  [PROPERTY_TYPES[1].value]: [
    { value: "pool", icon: POOL_ICON },
    { value: "locker", icon: LOCKER_ICON },
    { value: "parking", icon: PARKING_ICON },
    { value: "laundry", icon: LAUNDRY_ICON },
    { value: "gym", icon: GYM_ICON },
    { value: "partyRoom", icon: PARTY_ROOM_ICON }
  ],
  [PROPERTY_TYPES[2].value]: [
    { value: "washrooms", icon: WASHROOM_ICON },
    { value: "parking", icon: PARKING_ICON },
    { value: "storage", icon: STORAGE_ICON },
    { value: "elevator", icon: ELEVATOR_ICON }
  ],
  [PROPERTY_TYPES[3].value]: [
    { value: "washrooms", icon: WASHROOM_ICON },
    { value: "parking", icon: PARKING_ICON },
    { value: "storage", icon: STORAGE_ICON },
    { value: "elevator", icon: ELEVATOR_ICON }
  ],
  [PROPERTY_TYPES[4].value]: [
    { value: "washrooms", icon: WASHROOM_ICON },
    { value: "parking", icon: PARKING_ICON },
    { value: "storage", icon: STORAGE_ICON },
    { value: "elevator", icon: ELEVATOR_ICON }
  ]
};

export const PROPERTY_FEATURES_IMAGES = {
  basement: BASEMENT_ICON_SMALL,
  fireplace: FIREPLACE_ICON_SMALL,
  pool: POOL_ICON_SMALL,
  parking: PARKING_ICON_SMALL,
  locker: LOCKER_ICON_SMALL,
  airConditioning: AIR_CON_ICON_SMALL,
  balcony: BALCONY_ICON_SMALL,
  laundry: LAUNDRY_ICON_SMALL,
  gym: GYM_ICON_SMALL,
  partyRoom: PARTY_ROOM_ICON_SMALL,
  washrooms: WASHROOM_ICON_SMALL,
  storage: STORAGE_ICON_SMALL,
  elevator: ELEVATOR_ICON_SMALL
};
