import { API_URL } from '../config';

export const updateTable = payload => ({ type: UPDATE_TABLE, payload });
export const addTables = payload => ({ type: ADD_TABLES, payload })

const UPDATE_TABLE = 'api/tables/UPDATE_TABLE ';
const ADD_TABLES = 'api/tables/ADD_TABLES';


export function fetchTables(setIsLoading) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL)
      const tables = await response.json()
      setIsLoading(false);
      dispatch(addTables(tables))
    } catch (error) {
      console.error(error)
    }
  }
}

export function putData(data = {}) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3131/api/tables/${data?.id}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(
          data
        ),
      })
      const responseData = await response.json()
      dispatch(updateTable({ ...responseData }))
    } catch (error) {
      console.error(error)
    }
  }
}

const actionsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLE:
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