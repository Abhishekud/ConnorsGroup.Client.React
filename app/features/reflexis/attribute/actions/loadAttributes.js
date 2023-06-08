import {http} from '../../../shared/services';

export const LOAD_ATTRIBUTES = 'REFLEXIS/ATTRIBUTES/LOAD_ATTRIBUTES';
export const LOAD_ATTRIBUTES_PENDING = `${LOAD_ATTRIBUTES}_PENDING`;
export const LOAD_ATTRIBUTES_FULFILLED = `${LOAD_ATTRIBUTES}_FULFILLED`;
export const LOAD_ATTRIBUTES_REJECTED = `${LOAD_ATTRIBUTES}_REJECTED`;

export function loadAttributes() {
  return {
    type: LOAD_ATTRIBUTES,
    payload: http.get('reflexis/attributes'),
  };
}
