import {http} from '../../shared/services';

export const LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS = 'LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS';
export const LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadAttributeSelectListOptions() {
  return {
    type: LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS,
    payload: http.get('attributes/select-list-options'),
  };
}
