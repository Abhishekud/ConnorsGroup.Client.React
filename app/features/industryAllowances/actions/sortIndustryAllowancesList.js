export const SORT_INDUSTRY_ALLOWANCES_LIST = 'SORT_INDUSTRY_ALLOWANCES_LIST';
import {fromJS} from 'immutable';
export function sortIndustryAllowancesList(sort) {
  return {
    type: SORT_INDUSTRY_ALLOWANCES_LIST,
    payload: fromJS(sort),
  };
}
