import {http} from '../../shared/services';

export const ADD_INDUSTRY_ELEMENTS_TO_CLIENT = 'ADD_INDUSTRY_ELEMENTS_TO_CLIENT';
export const ADD_INDUSTRY_ELEMENTS_TO_CLIENT_PENDING = `${ADD_INDUSTRY_ELEMENTS_TO_CLIENT}_PENDING`;
export const ADD_INDUSTRY_ELEMENTS_TO_CLIENT_FULFILLED = `${ADD_INDUSTRY_ELEMENTS_TO_CLIENT}_FULFILLED`;
export const ADD_INDUSTRY_ELEMENTS_TO_CLIENT_REJECTED = `${ADD_INDUSTRY_ELEMENTS_TO_CLIENT}_REJECTED`;

export function addIndustryElementsToClient(ids, industrySourceId) {
  return {
    type: ADD_INDUSTRY_ELEMENTS_TO_CLIENT,
    payload: http.post('industry-elements/copy-to-client', {ids, industrySourceId}),
  };
}
