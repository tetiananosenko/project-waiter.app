import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import initialState from './initialState';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  if (action.type === 'CHANGE_SELECT') {
    return {
      ...state,
      tables: state.tables.map((table) => {
        if (table.id === action.payload.id) {
          return {
            ...table,
            status: action.payload.status,
            bill: action.payload.bill,
            peopleAmount: action.payload.peopleAmount,
            maxPeopleAmount: action.payload.maxPeopleAmount,
          }
        }
        return table
      })
    }
  }
  if (action.type === 'ADD_TABLES') {
    return {
      ...state,
      tables: action.payload
    }
  }
  return state;
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;