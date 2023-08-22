import { useReducer } from "react";
import apiClient from "../utils/apiClient";

const actions = {
  fetchRequest: "FETCH_DATA_REQUEST",
  fetchSuccess: "FETCH_DATA_SUCCESS",
  fetchFailure: "FETCH_DATA_FAILURE",
};
const initialState = {
  data: [],
  loading: false,
  error: null,
};
function reducer(state, { type, payload }) {
  switch (type) {
    case actions.fetchRequest:
      return { loading: true, error: null, data: [] };
    case actions.fetchSuccess:
      return { loading: false, error: null, data: payload };
    case actions.fetchFailure:
      return { loading: false, error: payload, data: [] };

    default:
      return state;
  }
}

const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function performAction(option) {
    try {
      dispatch({ type: actions.fetchRequest });
      const response = await apiClient(option);
      dispatch({
        type: actions.fetchSuccess,
        payload: response.data.results.slice(0, 5),
      });
    } catch (error) {
      dispatch({ type: actions.fetchFailure, payload: error });
    }
  }

  return [state, performAction];
};

export default useFetch;
