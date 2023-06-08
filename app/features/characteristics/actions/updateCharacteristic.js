import {http} from '../../shared/services';

export const UPDATE_CHARACTERISTIC = 'UPDATE_CHARACTERISTIC';
export const UPDATE_CHARACTERISTIC_PENDING = `${UPDATE_CHARACTERISTIC}_PENDING`;
export const UPDATE_CHARACTERISTIC_FULFILLED = `${UPDATE_CHARACTERISTIC}_FULFILLED`;
export const UPDATE_CHARACTERISTIC_REJECTED = `${UPDATE_CHARACTERISTIC}_REJECTED`;

export function updateCharacteristic(characteristic) {
  return {
    type: UPDATE_CHARACTERISTIC,
    payload: http.put(`characteristics/${characteristic.get('id')}`, characteristic),
  };
}
