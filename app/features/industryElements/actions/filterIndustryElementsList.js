import {fromJS} from 'immutable';
export const FILTER_INDUSTRY_ELEMENTS_LIST = 'FILTER_INDUSTRY_ELEMENTS_LIST';

export function filterIndustryElemetsList(filter) {
  return {
    type: FILTER_INDUSTRY_ELEMENTS_LIST,
    payload: fromJS(filter),
  };
}
