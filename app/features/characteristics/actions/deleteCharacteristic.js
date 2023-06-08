import {http} from '../../shared/services';

export const DELETE_CHARACTERISTIC = 'DELETE_CHARACTERISTIC';
export const DELETE_CHARACTERISTIC_PENDING = `${DELETE_CHARACTERISTIC}_PENDING`;
export const DELETE_CHARACTERISTIC_FULFILLED = `${DELETE_CHARACTERISTIC}_FULFILLED`;
export const DELETE_CHARACTERISTIC_REJECTED = `${DELETE_CHARACTERISTIC}_REJECTED`;

export function deleteCharacteristic(characteristicId) {
  return {
    type: DELETE_CHARACTERISTIC,
    payload: http.delete(`characteristics/${characteristicId}`),
  };
}
