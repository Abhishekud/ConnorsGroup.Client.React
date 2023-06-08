import {fromJS} from 'immutable';

export const FILTER_ALLOWANCES_LIST = 'FILTER_ALLOWANCES_LIST';

export function filterAllowancesList(filter) {
  return {
    type: FILTER_ALLOWANCES_LIST,
    payload: fromJS(filter),
  };
}
