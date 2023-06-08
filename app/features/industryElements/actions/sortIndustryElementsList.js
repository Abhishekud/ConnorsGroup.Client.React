export const SORT_INDUSTRY_ELEMENTS_LIST = 'SORT_INDUSTRY_ELEMENTS_LIST';
import {fromJS} from 'immutable';
export function sortIndustryElementsList(sort) {
  return {
    type: SORT_INDUSTRY_ELEMENTS_LIST,
    payload: fromJS(sort),
  };
}
