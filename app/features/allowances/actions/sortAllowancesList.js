import {fromJS} from 'immutable';

export const SORT_ALLOWANCES_LIST = 'SORT_ALLOWANCES_LIST';

export function sortAllowancesList(sort) {
  return {
    type: SORT_ALLOWANCES_LIST,
    payload: fromJS(sort),
  };
}
