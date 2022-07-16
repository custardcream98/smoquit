import { SET_PROFILE } from "store/actions/profileAction";

const loggedReducer = (
  state = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    providerId: "",
    uid: "",
    cigPerDay: 20,
  },
  action
) => {
  switch (action.type) {
    case SET_PROFILE:
      const {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
        uid,
        cigPerDay,
      } = action.user;
      return {
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
        uid,
        cigPerDay,
      };
    default:
      return state;
  }
};
export default loggedReducer;
