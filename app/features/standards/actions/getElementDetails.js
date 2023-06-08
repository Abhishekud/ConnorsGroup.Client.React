import {http} from '../../shared/services';
export const GET_ELEMENT_DETAILS = 'GET_ELEMENT_DETAILS';
export const GET_ELEMENT_DETAILS_REJECTED = `${GET_ELEMENT_DETAILS}_REJECTED`;
export const GET_ELEMENT_DETAILS_PENDING = `${GET_ELEMENT_DETAILS}_PENDING`;
export const GET_ELEMENT_DETAILS_FULFILLED = `${GET_ELEMENT_DETAILS}_FULFILLED`;

export function getElementDetails(id) {
  return {
    type: GET_ELEMENT_DETAILS,
    payload: http.get(`elements/${id}`),
  };
}
