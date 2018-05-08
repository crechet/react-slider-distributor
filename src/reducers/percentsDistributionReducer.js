import * as pdActionTypes from '../constants/percentsDistributionActionTypes';
import { distributePercents } from '../utils/utils';

const initialState = {
  items: [],
  isFetching: false,
  error: false
};

const percentsDistribution = (state = initialState, action = {}) => {
  switch (action.type) {
    case pdActionTypes.PD_FETCH_ITEMS:
    case pdActionTypes.PD_FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true
      };

    case pdActionTypes.PD_FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: { ...action.payload.error }
      };

    case pdActionTypes.PD_FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [ ...action.payload.items ]
      };

    case pdActionTypes.PD_UPDATE_ITEM:
      return {
        ...state,
        items: [ ...action.payload.items ]
      };

    case pdActionTypes.PD_ADD_ITEM:
      return {
        ...state,
        items: [ ...distributePercents([ ...state.items ].concat(action.payload.item))]
      };

    default:
      return state;
  }
};

export default percentsDistribution;
