import {http} from '../../shared/services';

export const LOAD_CHARACTERISTIC_DETAILS = 'LOAD_CHARACTERISTIC_DETAILS';
export const LOAD_CHARACTERISTIC_DETAILS_PENDING = `${LOAD_CHARACTERISTIC_DETAILS}_PENDING`;
export const LOAD_CHARACTERISTIC_DETAILS_FULFILLED = `${LOAD_CHARACTERISTIC_DETAILS}_FULFILLED`;

export function loadCharacteristicDetails(characteristicId) {
  return {
    type: LOAD_CHARACTERISTIC_DETAILS,
    payload: http.get(`characteristics/${characteristicId}`),
  };
}
