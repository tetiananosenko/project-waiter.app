import { API_URLOPTIONS } from '../config';

export const addOptions = payload => ({ type: ADD_OPTIONS, payload });

const ADD_OPTIONS = 'api/options/ADD_OPTIONS ';

export function fetchOptions  () {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URLOPTIONS)
      const options = await response.json()
      dispatch(addOptions(options))
    } catch (error) {
      console.error(error)
    }
  }
}

const optionsRedux = (statePart = [], action) => {
  switch (action.type) {
    case ADD_OPTIONS:
      return [
        ...action.payload
      ]
    default:
      return statePart;
  }
}

export default optionsRedux;