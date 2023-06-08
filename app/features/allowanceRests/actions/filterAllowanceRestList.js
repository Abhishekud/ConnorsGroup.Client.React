import {fromJS} from 'immutable';

export const FILTER_ALLOWANCE_REST_LIST = 'FILTER_ALLOWANCE_REST_LIST';

export function filterAllowanceRestList(filter) {
  return {
    type: FILTER_ALLOWANCE_REST_LIST,
    payload: fromJS(filter),
  };
}
