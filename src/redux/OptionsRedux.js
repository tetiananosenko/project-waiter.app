
export const addOptions = payload => ({ type: ADD_OPTIONS, payload });


const ADD_OPTIONS = 'api/options/ADD_OPTIONS ';


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