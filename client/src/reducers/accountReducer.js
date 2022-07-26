import { SET_DEFAULT_ACCOUNT , SET_CURRENT_ACCOUNT} from '../actions/types';

const initialState = {
  account_id: null,
  account_name: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_ACCOUNT:
      return{
        account_id: action.payload.id,
        account_name: action.payload.name
      };
    case SET_CURRENT_ACCOUNT:
      return{
        account_id: action.payload.id,
        account_name: action.payload.name
      };
    default:
      return state;
  }
}
