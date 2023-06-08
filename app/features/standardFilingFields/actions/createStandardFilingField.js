import {http} from '../../shared/services';

export const CREATE_STANDARD_FILING_FIELD = 'CREATE_STANDARD_FILING_FIELD';
export const CREATE_STANDARD_FILING_FIELD_PENDING = `${CREATE_STANDARD_FILING_FIELD}_PENDING`;
export const CREATE_STANDARD_FILING_FIELD_FULFILLED = `${CREATE_STANDARD_FILING_FIELD}_FULFILLED`;
export const CREATE_STANDARD_FILING_FIELD_REJECTED = `${CREATE_STANDARD_FILING_FIELD}_REJECTED`;

export function createStandardFilingField(model) {
  return {
    type: CREATE_STANDARD_FILING_FIELD,
    payload: http.post('standard-filing-fields', model),
  };
}
