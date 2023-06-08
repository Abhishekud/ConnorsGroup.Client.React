import {http} from '../../shared/services';

export const LOAD_CHARACTERISTIC_STANDARDS_LIST = 'LOAD_CHARACTERISTIC_STANDARDS_LIST';
export const LOAD_CHARACTERISTIC_STANDARDS_LIST_PENDING = `${LOAD_CHARACTERISTIC_STANDARDS_LIST}_PENDING`;
export const LOAD_CHARACTERISTIC_STANDARDS_LIST_FULFILLED = `${LOAD_CHARACTERISTIC_STANDARDS_LIST}_FULFILLED`;
export const LOAD_CHARACTERISTIC_STANDARDS_LIST_REJECTED = `${LOAD_CHARACTERISTIC_STANDARDS_LIST}_REJECTED`;

export function loadCharacteristicStandardsList(characteristicId) {
  return {
    type: LOAD_CHARACTERISTIC_STANDARDS_LIST,
    payload: http.get(`characteristics/${ characteristicId }/where-used`),
  };
}
