import {http} from '../../shared/services';

export const LOAD_STANDARD_FILING_FIELDS_LIST = 'LOAD_STANDARD_FILING_FIELDS_LIST';
export const LOAD_STANDARD_FILING_FIELDS_LIST_PENDING = `${LOAD_STANDARD_FILING_FIELDS_LIST}_PENDING`;
export const LOAD_STANDARD_FILING_FIELDS_LIST_FULFILLED = `${LOAD_STANDARD_FILING_FIELDS_LIST}_FULFILLED`;
export const LOAD_STANDARD_FILING_FIELDS_LIST_REJECTED = `${LOAD_STANDARD_FILING_FIELDS_LIST}_REJECTED`;

export function loadStandardFilingFieldsList() {
  return {
    type: LOAD_STANDARD_FILING_FIELDS_LIST,
    payload: http.get('standard-filing-fields/list'),
  };
}
