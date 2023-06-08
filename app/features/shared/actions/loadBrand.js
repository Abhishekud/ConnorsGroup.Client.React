import {http} from '../../shared/services';

export const LOAD_BRAND = 'LOAD_BRAND';
export const LOAD_BRAND_PENDING = `${LOAD_BRAND}_PENDING`;
export const LOAD_BRAND_FULFILLED = `${LOAD_BRAND}_FULFILLED`;
export const LOAD_BRAND_REJECTED = `${LOAD_BRAND}_REJECTED`;

export function loadBrand() {
  return {
    type: LOAD_BRAND,
    payload: http.get('client/brand'),
  };
}
