import {
  START_LOADING,
  END_LOADING,
  UPDATE_CARD,
  ADD_CARD,
  DELETE_CARD,
  UPDATE_BUCKET,
} from "../actionTypes";

export const updateBucket = (value, id) => (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_BUCKET, payload: { value, id } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createCard = (data, category, setOpen, message) => (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: ADD_CARD, payload: { data, category } });
    dispatch({ type: END_LOADING });
    setOpen(false);
    return message("New card added successfully");
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = (data, category, setOpen, message) => (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_CARD, payload: { data, category } });
    dispatch({ type: END_LOADING });
    setOpen(false);
    message("Card updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCard = (data, category, message) => (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    dispatch({ type: DELETE_CARD, payload: { data, category } });
    dispatch({ type: END_LOADING });
    return message("Card deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
