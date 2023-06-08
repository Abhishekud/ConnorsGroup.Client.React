import {http} from '../../../shared/services';

export const CREATE_REFLEXIS_ATTRIBUTE = 'CREATE_REFLEXIS_ATTRIBUTE';
export const CREATE_REFLEXIS_ATTRIBUTE_PENDING = `${CREATE_REFLEXIS_ATTRIBUTE}_PENDING`;
export const CREATE_REFLEXIS_ATTRIBUTE_FULFILLED = `${CREATE_REFLEXIS_ATTRIBUTE}_FULFILLED`;
export const CREATE_REFLEXIS_ATTRIBUTE_REJECTED = `${CREATE_REFLEXIS_ATTRIBUTE}_REJECTED`;

export function createAttribute(model) {

  return {
    type: CREATE_REFLEXIS_ATTRIBUTE,
    payload: http.post('reflexis/attributes', model),
  };
}


