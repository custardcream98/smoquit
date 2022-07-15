export const SET_PROFILE = "profileReducer/setProfile";

export const setProfile = ({
  displayName,
  email,
  phoneNumber,
  photoURL,
  providerId,
  uid,
}) => ({
  type: SET_PROFILE,
  user: { displayName, email, phoneNumber, photoURL, providerId, uid },
});
