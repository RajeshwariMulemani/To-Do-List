
import { ADD_NOTES_SUCCESS,GET_USER_NOTES } from '../actions/types';

const initialState = {
  addNotes_success: {},
  get_user_notes:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTES_SUCCESS:
      return {
        ...state,
       
        addNotes_success: action.payload
      };
      case GET_USER_NOTES:
      return {
        ...state,
       
        get_user_notes: action.payload
      };
    default:
      return state;
  }
}
