import {fromJS} from 'immutable';
export const FILTER_INDUSTRY_ALLOWANCES_LIST = 'FILTER_INDUSTRY_ALLOWANCES_LIST';

export function filterIndustryAllowancesList(filter) {
  return {
    type: FILTER_INDUSTRY_ALLOWANCES_LIST,
    payload: fromJS(filter),
  };
}
