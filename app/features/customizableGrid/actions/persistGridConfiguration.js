import {http} from '../../shared/services';
import {persistGridConfiguration as typeBuilder} from '../services/gridActionBuilder';

export const PERSIST_GRID_CONFIGURATION = 'PERSIST_GRID_CONFIGURATION';
export const PERSIST_GRID_CONFIGURATION_REJECTED = `${PERSIST_GRID_CONFIGURATION}_REJECTED`;
export const PERSIST_GRID_CONFIGURATION_PENDING = `${PERSIST_GRID_CONFIGURATION}_PENDING`;
export const PERSIST_GRID_CONFIGURATION_FULFILLED = `${PERSIST_GRID_CONFIGURATION}_FULFILLED`;

export function persistGridConfiguration(gridId, configuration) {
  return {
    type: typeBuilder(gridId),
    payload: http.post(`grids/${gridId}`, {configuration: `${JSON.stringify(configuration)}`}),
  };
}
