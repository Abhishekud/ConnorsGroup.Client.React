import {http} from '../../shared/services';
import {retrieveGridConfiguration as typeBuilder} from '../services/gridActionBuilder';

export const RETRIEVE_GRID_CONFIGURATION = 'RETRIEVE_GRID_CONFIGURATION';
export const RETRIEVE_GRID_CONFIGURATION_REJECTED = `${RETRIEVE_GRID_CONFIGURATION}_REJECTED`;
export const RETRIEVE_GRID_CONFIGURATION_PENDING = `${RETRIEVE_GRID_CONFIGURATION}_PENDING`;
export const RETRIEVE_GRID_CONFIGURATION_FULFILLED = `${RETRIEVE_GRID_CONFIGURATION}_FULFILLED`;

export function retrieveGridConfiguration(gridId) {
  return {
    type: typeBuilder(gridId),
    payload: http.get(`grids/${gridId}`),
  };
}
