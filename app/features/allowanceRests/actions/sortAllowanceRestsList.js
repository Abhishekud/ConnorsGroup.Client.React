import {fromJS} from 'immutable';

export const SORT_ALLOWANCE_RESTS_LIST = 'SORT_ALLOWANCE_RESTS_LIST';

export function sortAllowanceRestsList(sort) {
  return {
    type: SORT_ALLOWANCE_RESTS_LIST,
    payload: fromJS(sort),
  };
}
