import {http} from '../../shared/services';

export const LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS = 'LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS';
export const LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadCharacteristicSetSelectListOptions() {
  return {
    type: LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS,
    payload: http.get('characteristic-sets/select-list-options'),
  };
}
