import {fromJS} from 'immutable';
export const FILTER_INDUSTRY_STANDARDS_LIST = 'FILTER_INDUSTRY_STANDARDS_LIST';

export function filterIndustryStandardsList(filter) {
  return {
    type: FILTER_INDUSTRY_STANDARDS_LIST,
    payload: fromJS(filter),
  };
}
