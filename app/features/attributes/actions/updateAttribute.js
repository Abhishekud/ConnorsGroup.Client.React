import {http} from '../../shared/services';

export const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';
export const UPDATE_ATTRIBUTE_PENDING = `${UPDATE_ATTRIBUTE}_PENDING`;
export const UPDATE_ATTRIBUTE_FULFILLED = `${UPDATE_ATTRIBUTE}_FULFILLED`;
export const UPDATE_ATTRIBUTE_REJECTED = `${UPDATE_ATTRIBUTE}_REJECTED`;

export function updateAttribute(attribute) {
  return {
    type: UPDATE_ATTRIBUTE,
    payload: http.put(`attributes/${attribute.get('id')}`, attribute),
  };
}
