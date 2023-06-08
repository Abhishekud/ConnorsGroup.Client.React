import {http} from '../../shared/services';

export const CREATE_CHARACTERISTIC_SET = 'CREATE_CHARACTERISTIC_SET';
export const CREATE_CHARACTERISTIC_SET_PENDING = `${CREATE_CHARACTERISTIC_SET}_PENDING`;
export const CREATE_CHARACTERISTIC_SET_FULFILLED = `${CREATE_CHARACTERISTIC_SET}_FULFILLED`;
export const CREATE_CHARACTERISTIC_SET_REJECTED = `${CREATE_CHARACTERISTIC_SET}_REJECTED`;

export function createCharacteristicSet(model, departmentId) {
  return {
    type: CREATE_CHARACTERISTIC_SET,
    payload: http.post('characteristic-sets', {...model.toJSON(), departmentId}),
  };
}
