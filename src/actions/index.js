import axios from 'axios';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

export const removeItem = (itemType, id) => {
  return async (dispatch) => {
    dispatch({ REMOVE_ITEM_REQUEST });

    try {
      await axios.delete(`http://localhost:9000/api/note/${id}`);
      dispatch({
        type: REMOVE_ITEM_SUCCESS,
        itemType,
        id,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: REMOVE_ITEM_FAILURE });
    }
  };
};

export const addItem = (itemType, itemContent) => {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_ITEM_REQUEST });

    try {
      const payload = await axios.post('http://localhost:9000/api/note', {
        userID: getState().userID,
        type: itemType,
        ...itemContent,
      });
      const { data } = payload;
      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: {
          itemType,
          data,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: ADD_ITEM_FAILURE });
    }
  };
};

export const authenticate = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST });

    try {
      const payload = await axios.post('http://localhost:9000/api/user/login', {
        username,
        password,
      });
      console.log(payload);
      dispatch({ type: AUTH_SUCCESS, payload });
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_FAILURE });
    }
  };
};

export const fetchItems = (itemType) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REQUEST });

    try {
      const payload = await axios.get('http://localhost:9000/api/notes/type', {
        params: {
          type: itemType,
          userID: getState().userID,
        },
      });
      console.log(payload);
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data: payload.data,
          itemType,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_FAILURE });
    }
  };
};
