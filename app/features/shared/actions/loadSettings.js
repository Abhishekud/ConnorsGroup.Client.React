import {http} from '../../shared/services';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const LOAD_SETTINGS_PENDING = `${LOAD_SETTINGS}_PENDING`;
export const LOAD_SETTINGS_REJECTED = `${LOAD_SETTINGS}_REJECTED`;
export const LOAD_SETTINGS_FULFILLED = `${LOAD_SETTINGS}_FULFILLED`;

export function loadSettings() {
  return {
    type: LOAD_SETTINGS,
    payload: http.get('settings/list'),
  };
}
