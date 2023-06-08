import {http} from '../../shared/services';

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SAVE_SETTINGS_PENDING = `${SAVE_SETTINGS}_PENDING`;
export const SAVE_SETTINGS_FULFILLED = `${SAVE_SETTINGS}_FULFILLED`;
export const SAVE_SETTINGS_REJECTED = `${SAVE_SETTINGS}_REJECTED`;

export function saveSettings(fields) {
  return {
    type: SAVE_SETTINGS,
    payload: http.post('settings/update', {settings: fields.valueSeq().toArray()}),
  };
}
