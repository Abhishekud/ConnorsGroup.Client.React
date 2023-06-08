import {http} from '../../shared/services';

export const LOAD_CHARACTERISTICS_LIST = 'LOAD_CHARACTERISTICS_LIST';
export const LOAD_CHARACTERISTICS_LIST_PENDING = `${LOAD_CHARACTERISTICS_LIST}_PENDING`;
export const LOAD_CHARACTERISTICS_LIST_FULFILLED = `${LOAD_CHARACTERISTICS_LIST}_FULFILLED`;
export const LOAD_CHARACTERISTICS_LIST_REJECTED = `${LOAD_CHARACTERISTICS_LIST}_REJECTED`;

export function loadCharacteristicsList(skip, filter, sort, departmentId, CharacteristicSetIds) {
  const payload = {skip, filter, sort, departmentId, CharacteristicSetIds};
  return {
    type: LOAD_CHARACTERISTICS_LIST,
    payload: http.post('characteristics/list', payload),
  };
}
