import {http} from '../../shared/services';

export const LOAD_ELEMENT_ACTIVITIES_LIST = 'LOAD_ELEMENT_ACTIVITIES_LIST';
export const LOAD_ELEMENT_ACTIVITIES_LIST_PENDING = `${LOAD_ELEMENT_ACTIVITIES_LIST}_PENDING`;
export const LOAD_ELEMENT_ACTIVITIES_LIST_FULFILLED = `${LOAD_ELEMENT_ACTIVITIES_LIST}_FULFILLED`;
export const LOAD_ELEMENT_ACTIVITIES_LIST_REJECTED = `${LOAD_ELEMENT_ACTIVITIES_LIST}_REJECTED`;

export function loadActivitiesList() {
  return {
    type: LOAD_ELEMENT_ACTIVITIES_LIST,
    payload: http.get('element-activities/list'),
  };
}
