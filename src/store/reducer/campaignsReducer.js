import { SET_CAMPAIGNS } from "store/actions/campaignsAction";

const campaignsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPAIGNS:
      return action.campaigns;
    default:
      return state;
  }
};
export default campaignsReducer;
