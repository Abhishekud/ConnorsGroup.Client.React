import {http} from '../../shared/services';

export const CREATE_CHARACTERISTIC = 'CREATE_CHARACTERISTIC';
export const CREATE_CHARACTERISTIC_PENDING = `${CREATE_CHARACTERISTIC}_PENDING`;
export const CREATE_CHARACTERISTIC_FULFILLED = `${CREATE_CHARACTERISTIC}_FULFILLED`;
export const CREATE_CHARACTERISTIC_REJECTED = `${CREATE_CHARACTERISTIC}_REJECTED`;

export function createCharacteristic(model, selectedDepartmentId) {
  return {
    type: CREATE_CHARACTERISTIC,
    payload: http.post('characteristics', {...model.toJSON(), departmentId: selectedDepartmentId}),
  };
}
