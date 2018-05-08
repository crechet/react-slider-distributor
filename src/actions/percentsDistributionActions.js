import * as pdActionTypes from '../constants/percentsDistributionActionTypes';
import axios from 'axios';
import { distributePercents, doChangeStep } from '../utils/utils';

/**
 * Start loading distribution array from server.
 * */
const percentsDistributionRequestStart = (type) => {
  return {
    type: pdActionTypes.PD_FETCH_ITEMS_START || type
  };
};

/**
 * Loading of distribution array from server was success.
 * */
const percentsDistributionRequestSuccess = items => {
  return {
    type: pdActionTypes.PD_FETCH_ITEMS_SUCCESS,
    payload: { items: items }
  };
};

/**
 * Loading of distribution array from server failed.
 * */
const percentsDistributionRequestFailure = error => {
  return {
    type: pdActionTypes.PD_FETCH_ITEMS_FAILURE,
    payload: { error: error }
  };
};

/**
 * Loads percents distribution array from server (simulation).
 * */
export const fetchPercentsDistribution = () => {
  return (dispatch) => {
    // Start request.
    dispatch(percentsDistributionRequestStart(pdActionTypes.PD_FETCH_ITEMS));

    axios.get('./data/percentsDistribution.json')
      .then(
        (response) => {
          // Request was success.
          const updatedItems = distributePercents(response.data.items);
          dispatch(percentsDistributionRequestSuccess(updatedItems));
        },
        (error) => {
          // Request failed.
          const errorPayload = {
            status: error.response.status,
            message: error.response.statusText
          };
          dispatch(percentsDistributionRequestFailure(errorPayload));
        }
      )
  };
};

/**
 * Update percent distribution in redux store.
 * */
export const updatePercentDistribution = (changedItemIndex, newValue) => {
  return (dispatch, getState) => {
    const items = getState().percentsDistribution.items;
    let newItems = [ ...items ];

    // Get old value of changed item.
    const oldValue = newItems[changedItemIndex].percent;
    // Calculate ne items values.
    newItems = [ ...doChangeStep(newItems, changedItemIndex, oldValue, newValue) ];

    dispatch({
      type: pdActionTypes.PD_UPDATE_ITEM,
      payload: { items: newItems }
    });
  };
};

/**
 * Create new percent item.
 * */
export const addPercentItem = () => {
  return (dispatch, getState) => {
    const items = getState().percentsDistribution.items;
    const newItem = {
      name: `Item ${items.length + 1}`,
      percent: 0
    };

    dispatch(saveNewItem(newItem));
  };
};

/**
 * Create new percent item in redux store.
 * */
const saveNewItem = (item) => {
  return {
    type: pdActionTypes.PD_ADD_ITEM,
    payload: { item }
  };
};
