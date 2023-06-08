import {http} from '../../shared/services';

export const LOAD_INDUSTRY_ELEMENTS_LIST = 'LOAD_INDUSTRY_ELEMENTS_LIST';
export const LOAD_INDUSTRY_ELEMENTS_LIST_PENDING = `${LOAD_INDUSTRY_ELEMENTS_LIST}_PENDING`;
export const LOAD_INDUSTRY_ELEMENTS_LIST_FULFILLED = `${LOAD_INDUSTRY_ELEMENTS_LIST}_FULFILLED`;
export const LOAD_INDUSTRY_ELEMENTS_LIST_REJECTED = `${LOAD_INDUSTRY_ELEMENTS_LIST}_REJECTED`;

export function loadIndustryElementsList(industrySourceId) {
  return {
    type: LOAD_INDUSTRY_ELEMENTS_LIST,
    payload: http.post('industry-elements/list', {industrySourceId}),
  };
}
