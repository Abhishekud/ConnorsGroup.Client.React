import {http} from '../../shared/services';

export const UPDATE_STANDARD_FILING_FIELD = 'UPDATE_STANDARD_FILING_FIELD';
export const UPDATE_STANDARD_FILING_FIELD_PENDING = `${UPDATE_STANDARD_FILING_FIELD}_PENDING`;
export const UPDATE_STANDARD_FILING_FIELD_FULFILLED = `${UPDATE_STANDARD_FILING_FIELD}_FULFILLED`;
export const UPDATE_STANDARD_FILING_FIELD_REJECTED = `${UPDATE_STANDARD_FILING_FIELD}_REJECTED`;

export function updateStandardFilingField(model) {
  return {
    type: UPDATE_STANDARD_FILING_FIELD,
    payload: http.put(`standard-filing-fields/${model.get('id')}`, model),
  };
}
