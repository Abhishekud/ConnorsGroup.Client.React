import {http} from '../../shared/services';

export const CREATE_ATTRIBUTE = 'CREATE_ATTRIBUTE';
export const CREATE_ATTRIBUTE_PENDING = `${CREATE_ATTRIBUTE}_PENDING`;
export const CREATE_ATTRIBUTE_FULFILLED = `${CREATE_ATTRIBUTE}_FULFILLED`;
export const CREATE_ATTRIBUTE_REJECTED = `${CREATE_ATTRIBUTE}_REJECTED`;

export function createAttribute(model) {
  return {
    type: CREATE_ATTRIBUTE,
    payload: http.post('attributes', model),
  };
}
