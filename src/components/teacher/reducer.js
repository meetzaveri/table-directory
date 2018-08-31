import {fetchstudents_actions} from './actions';

export const registerreducer = (state = {
  studentlist: [],
  onLoading: false,
  error: ''
}, action) => {
  switch (action.type) {

    case fetchstudents_actions.FetchStudentRequested:
      state = {
        ...state,
        onLoading: true
      }
      return state;

    case fetchstudents_actions.FetchStudentSucceded:

      console.log('Action in register request success', action);
      let registerSuccess = action.payload;
      if (registerSuccess) {
        state = {
          ...state,
          studentlist: registerSuccess,
          onLoading: false
        }

        return state;
      } else {
        state = {
          ...state,
          studentlist: [],
          onLoading: false
        }
        return state;
      }

    case fetchstudents_actions.FetchStudentFailed:
      state = {
        ...state,
        studentlist: [],
        onLoading: false,
        error: action.message
      }
      console.log('Request fail : ', action.message);
      return state;

    default:
      state = {
        ...state
      }
      return state
  }

}