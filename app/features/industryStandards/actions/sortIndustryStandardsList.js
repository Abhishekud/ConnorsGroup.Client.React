export const SORT_INDUSTRY_STANDARDS_LIST = 'SORT_INDUSTRY_STANDARDS_LIST';
import {fromJS} from 'immutable';
export function sortIndustryStandardsList(sort) {
  return {
    type: SORT_INDUSTRY_STANDARDS_LIST,
    payload: fromJS(sort),
  };
}
