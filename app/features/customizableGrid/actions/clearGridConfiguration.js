import {clearGridConfiguration as typeBuilder} from '../services/gridActionBuilder';

export const CLEAR_GRID_CONFIGURATION = 'CLEAR_GRID_CONFIGURATION';
export const CLEAR_GRID_CONFIGURATION_FULFILLED = `${CLEAR_GRID_CONFIGURATION}_FULFILLED`;
export const CLEAR_GRID_CONFIGURATION_PENDING = `${CLEAR_GRID_CONFIGURATION}_PENDING`;
export const CLEAR_GRID_CONFIGURATION_REJECTED = `${CLEAR_GRID_CONFIGURATION}_REJECTED`;

export function clearGridConfiguration(gridId) {
  return {
    type: typeBuilder(gridId),
    payload: Promise.resolve(),
  };
}
