import {http} from '../../shared/services';

export const RENAME_CHARACTERISTIC = 'RENAME_CHARACTERISTIC';
export const RENAME_CHARACTERISTIC_PENDING = `${RENAME_CHARACTERISTIC}_PENDING`;
export const RENAME_CHARACTERISTIC_FULFILLED = `${RENAME_CHARACTERISTIC}_FULFILLED`;
export const RENAME_CHARACTERISTIC_REJECTED = `${RENAME_CHARACTERISTIC}_REJECTED`;

export function renameCharacteristic(characteristic) {
  return {
    type: RENAME_CHARACTERISTIC,
    payload: http.put(`characteristics/${characteristic.get('id')}/rename`, characteristic),
  };
}
