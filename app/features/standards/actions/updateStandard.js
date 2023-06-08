import {http} from '../../shared/services';

export const UPDATE_STANDARD = 'UPDATE_STANDARD';
export const UPDATE_STANDARD_PENDING = `${UPDATE_STANDARD}_PENDING`;
export const UPDATE_STANDARD_FULFILLED = `${UPDATE_STANDARD}_FULFILLED`;
export const UPDATE_STANDARD_REJECTED = `${UPDATE_STANDARD}_REJECTED`;

export function updateStandard(id, model) {
  return {
    type: UPDATE_STANDARD,
    payload: http.put(`standards/${id}`, model.toJS()),
  };
}
