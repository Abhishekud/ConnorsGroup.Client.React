import {http} from '../../shared/services';

export const DELETE_STANDARD_FILING_FIELD = 'DELETE_STANDARD_FILING_FIELD';
export const DELETE_STANDARD_FILING_FIELD_PENDING = `${DELETE_STANDARD_FILING_FIELD}_PENDING`;
export const DELETE_STANDARD_FILING_FIELD_FULFILLED = `${DELETE_STANDARD_FILING_FIELD}_FULFILLED`;
export const DELETE_STANDARD_FILING_FIELD_REJECTED = `${DELETE_STANDARD_FILING_FIELD}_REJECTED`;

export function deleteStandardFilingField(id) {
  return {
    type: DELETE_STANDARD_FILING_FIELD,
    payload: http.delete(`standard-filing-fields/${id}`),
  };
}
