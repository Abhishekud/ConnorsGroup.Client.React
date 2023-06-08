import {updateCachedGridConfiguration as typeBuilder} from '../services/gridActionBuilder';

export const UPDATE_CACHED_GRID_CONFIGURATION = 'UPDATE_CACHED_GRID_CONFIGURATION';
export const UPDATE_CACHED_GRID_CONFIGURATION_FULFILLED = `${UPDATE_CACHED_GRID_CONFIGURATION}_FULFILLED`;
export const UPDATE_CACHED_GRID_CONFIGURATION_PENDING = `${UPDATE_CACHED_GRID_CONFIGURATION}_PENDING`;
export const UPDATE_CACHED_GRID_CONFIGURATION_REJECTED = `${UPDATE_CACHED_GRID_CONFIGURATION}_REJECTED`;

export function updateCachedGridConfiguration(gridId, cachedGridConfiguration) {
  return {
    type: typeBuilder(gridId),
    payload: cachedGridConfiguration,
  };
}
