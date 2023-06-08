import {
  PERSIST_GRID_CONFIGURATION,
  PERSIST_GRID_CONFIGURATION_FULFILLED,
  PERSIST_GRID_CONFIGURATION_PENDING,
  PERSIST_GRID_CONFIGURATION_REJECTED,
} from '../actions/persistGridConfiguration';
import {
  RETRIEVE_GRID_CONFIGURATION,
  RETRIEVE_GRID_CONFIGURATION_FULFILLED,
  RETRIEVE_GRID_CONFIGURATION_PENDING,
  RETRIEVE_GRID_CONFIGURATION_REJECTED,
} from '../actions/retrieveGridConfiguration';
import {
  UPDATE_CACHED_GRID_CONFIGURATION,
  UPDATE_CACHED_GRID_CONFIGURATION_FULFILLED,
  UPDATE_CACHED_GRID_CONFIGURATION_PENDING,
  UPDATE_CACHED_GRID_CONFIGURATION_REJECTED,
} from '../actions/updateCachedGridConfiguration';
import {
  CLEAR_GRID_CONFIGURATION,
  CLEAR_GRID_CONFIGURATION_FULFILLED,
  CLEAR_GRID_CONFIGURATION_PENDING,
  CLEAR_GRID_CONFIGURATION_REJECTED,
} from '../actions/clearGridConfiguration';

export const persistGridConfiguration = gridId => `${gridId}_${PERSIST_GRID_CONFIGURATION}`;
export const persistGridConfigurationFulfilled = gridId => `${gridId}_${PERSIST_GRID_CONFIGURATION_FULFILLED}`;
export const persistGridConfigurationPending = gridId => `${gridId}_${PERSIST_GRID_CONFIGURATION_PENDING}`;
export const persistGridConfigurationRejected = gridId => `${gridId}_${PERSIST_GRID_CONFIGURATION_REJECTED}`;

export const retrieveGridConfiguration = gridId => `${gridId}_${RETRIEVE_GRID_CONFIGURATION}`;
export const retrieveGridConfigurationFulfilled = gridId => `${gridId}_${RETRIEVE_GRID_CONFIGURATION_FULFILLED}`;
export const retrieveGridConfigurationPending = gridId => `${gridId}_${RETRIEVE_GRID_CONFIGURATION_PENDING}`;
export const retrieveGridConfigurationRejected = gridId => `${gridId}_${RETRIEVE_GRID_CONFIGURATION_REJECTED}`;

export const updateCachedGridConfiguration = gridId => `${gridId}_${UPDATE_CACHED_GRID_CONFIGURATION}`;
export const updateCachedGridConfigurationFulfilled = gridId => `${gridId}_${UPDATE_CACHED_GRID_CONFIGURATION_FULFILLED}`;
export const updateCachedGridConfigurationPending = gridId => `${gridId}_${UPDATE_CACHED_GRID_CONFIGURATION_PENDING}`;
export const updateCachedGridConfigurationRejected = gridId => `${gridId}_${UPDATE_CACHED_GRID_CONFIGURATION_REJECTED}`;

export const clearGridConfiguration = gridId => `${gridId}_${CLEAR_GRID_CONFIGURATION}`;
export const clearGridConfigurationFulfilled = gridId => `${gridId}_${CLEAR_GRID_CONFIGURATION_FULFILLED}`;
export const clearGridConfigurationPending = gridId => `${gridId}_${CLEAR_GRID_CONFIGURATION_PENDING}`;
export const clearGridConfigurationRejected = gridId => `${gridId}_${CLEAR_GRID_CONFIGURATION_REJECTED}`;

export default {
  persistGridConfiguration,
  persistGridConfigurationFulfilled,
  persistGridConfigurationPending,
  persistGridConfigurationRejected,
  retrieveGridConfiguration,
  retrieveGridConfigurationFulfilled,
  retrieveGridConfigurationPending,
  retrieveGridConfigurationRejected,
  updateCachedGridConfiguration,
  updateCachedGridConfigurationFulfilled,
  updateCachedGridConfigurationPending,
  updateCachedGridConfigurationRejected,
  clearGridConfiguration,
  clearGridConfigurationFulfilled,
  clearGridConfigurationPending,
  clearGridConfigurationRejected,
};
