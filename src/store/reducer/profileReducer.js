import { SET_PROFILE } from "store/actions/profileAction";

const loggedReducer = (
  state = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    providerId: "",
    uid: "",
  },
  action
) => {
  switch (action.type) {
    case SET_PROFILE:
      const { displayName, email, phoneNumber, photoURL, providerId, uid } =
        action.user;
      return {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
        uid,
      };
    default:
      return state;
  }
};
export default loggedReducer;
