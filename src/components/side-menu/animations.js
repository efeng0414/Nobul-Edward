import {
  EDIT_AVATAR_CLASSNAME,
  EASE_IN_OUT_QUAD
} from "../../utilities/constants-animation";

export const editAvatarEnter = {
  targets: EDIT_AVATAR_CLASSNAME,
  translateX: [-320, 0],
  easing: EASE_IN_OUT_QUAD,
  duration: 500
};

export const editAvatarLeave = {
  targets: EDIT_AVATAR_CLASSNAME,
  translateX: [0, -320],
  easing: EASE_IN_OUT_QUAD,
  duration: 500
};
