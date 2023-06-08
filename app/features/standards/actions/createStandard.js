import {http} from '../../shared/services';

export const CREATE_STANDARD = 'CREATE_STANDARD';
export const CREATE_STANDARD_PENDING = `${CREATE_STANDARD}_PENDING`;
export const CREATE_STANDARD_REJECTED = `${CREATE_STANDARD}_REJECTED`;
export const CREATE_STANDARD_FULFILLED = `${CREATE_STANDARD}_FULFILLED`;

export function createStandard(model) {
  return {
    type: CREATE_STANDARD,
    payload: http.post('standards', model),
  };
}
