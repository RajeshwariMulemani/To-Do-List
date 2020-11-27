import axios from 'axios';

import { GET_ERRORS, ADD_NOTES_SUCCESS ,GET_USER_NOTES} from './types';

// Add Notes
export const addNotes = (data) => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      dispatch({
        type:ADD_NOTES_SUCCESS,
        payload:{}
      });
  axios
    .post('/api/users/addnotes', data)
    .then(res => {

     
      dispatch({
          type:ADD_NOTES_SUCCESS,
          payload:res.data
        });
      
        dispatch(getNotes({userId:data.userId,date:data.notes_date}));
     // history.push('/dashboard')
      
      
      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Get user notes
export const getNotes = (data) => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      dispatch({
        type:GET_USER_NOTES,
        payload:[]
      });
  axios
    .get(`/api/users/getnotes/${data.userId}?notes_date=${data.date}`)
    .then(res => {

     
      dispatch({
          type:GET_USER_NOTES,
          payload:res.data
        });
      
     // history.push('/dashboard')
      
      
      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};