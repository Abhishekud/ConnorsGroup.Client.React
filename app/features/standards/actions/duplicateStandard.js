import {http} from '../../shared/services';

export const DUPLICATE_STANDARD = 'DUPLICATE_STANDARD';
export const DUPLICATE_STANDARD_PENDING = `${DUPLICATE_STANDARD}_PENDING`;
export const DUPLICATE_STANDARD_FULFILLED = `${DUPLICATE_STANDARD}_FULFILLED`;
export const DUPLICATE_STANDARD_REJECTED = `${DUPLICATE_STANDARD}_REJECTED`;

export function duplicateStandard(standardId, model) {
  return {
    type: DUPLICATE_STANDARD,
    payload: http.post(`standards/${standardId}/duplicate`, model),
  };
}
