import {http} from '../../../shared/services';

export const UPDATE_REFLEXIS_ATTRIBUTE = 'UPDATE_REFLEXIS_ATTRIBUTE';
export const UPDATE_REFLEXIS_ATTRIBUTE_PENDING = `${UPDATE_REFLEXIS_ATTRIBUTE}_PENDING`;
export const UPDATE_REFLEXIS_ATTRIBUTE_FULFILLED = `${UPDATE_REFLEXIS_ATTRIBUTE}_FULFILLED`;
export const UPDATE_REFLEXIS_ATTRIBUTE_REJECTED = `${UPDATE_REFLEXIS_ATTRIBUTE}_REJECTED`;

export function updateAttribute(model) {
  return {
    type: UPDATE_REFLEXIS_ATTRIBUTE,
    payload: http.put(`reflexis/attributes/${model.get('id')}`, model),
  };
}


