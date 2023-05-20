
export const addActions = payload => ({ type: ADD_ACTIONS, payload });
export const addTables = payload => ({ type: ADD_TABLES, payload })

const ADD_ACTIONS = 'api/tables/ADD_ACTIONS ';
const ADD_TABLES = 'api/tables/ADD_TABLES';

const actionsReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_ACTIONS:
      return [
        ...statePart?.map((table) => {
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
      ]
    case ADD_TABLES:
      return [
        ...action.payload
      ]
    default:
      return statePart;
  }
}

export default actionsReducer;