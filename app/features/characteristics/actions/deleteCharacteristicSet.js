import {http} from '../../shared/services';

export const DELETE_CHARACTERISTIC_SET = 'DELETE_CHARACTERISTIC_SET';
export const DELETE_CHARACTERISTIC_SET_PENDING = `${DELETE_CHARACTERISTIC_SET}_PENDING`;
export const DELETE_CHARACTERISTIC_SET_FULFILLED = `${DELETE_CHARACTERISTIC_SET}_FULFILLED`;
export const DELETE_CHARACTERISTIC_SET_REJECTED = `${DELETE_CHARACTERISTIC_SET}_REJECTED`;

export function deleteCharacteristicSet(characteristicSetId) {
  return {
    type: DELETE_CHARACTERISTIC_SET,
    payload: http.delete(`characteristic-sets/${characteristicSetId}`),
  };
}
