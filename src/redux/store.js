import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import initialState from './initialState';
import thunk from 'redux-thunk';
import actionsReducer from './TablesRedux';
import optionsRedux from './OptionsRedux';

const subreducers = {
  tables: actionsReducer,
  options: optionsRedux,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;