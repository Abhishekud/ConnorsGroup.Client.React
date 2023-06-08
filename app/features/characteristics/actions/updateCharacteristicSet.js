import {http} from '../../shared/services';

export const UPDATE_CHARACTERISTIC_SET = 'UPDATE_CHARACTERISTIC_SET';
export const UPDATE_CHARACTERISTIC_SET_PENDING = `${UPDATE_CHARACTERISTIC_SET}_PENDING`;
export const UPDATE_CHARACTERISTIC_SET_FULFILLED = `${UPDATE_CHARACTERISTIC_SET}_FULFILLED`;
export const UPDATE_CHARACTERISTIC_SET_REJECTED = `${UPDATE_CHARACTERISTIC_SET}_REJECTED`;

export function updateCharacteristicSet(characteristicSet, departmentId) {
  return {
    type: UPDATE_CHARACTERISTIC_SET,
    payload: {
      promise: http.put(`characteristic-sets/${characteristicSet.get('id')}`, {...characteristicSet.toJSON(), departmentId}),
      data: characteristicSet.get('id'),
    },
  };
}
