import {http} from '../../shared/services';

export const UPDATE_STANDARD_FILING_FIELD_OPTION = 'UPDATE_STANDARD_FILING_FIELD_OPTION';
export const UPDATE_STANDARD_FILING_FIELD_OPTION_PENDING = `${UPDATE_STANDARD_FILING_FIELD_OPTION}_PENDING`;
export const UPDATE_STANDARD_FILING_FIELD_OPTION_FULFILLED = `${UPDATE_STANDARD_FILING_FIELD_OPTION}_FULFILLED`;
export const UPDATE_STANDARD_FILING_FIELD_OPTION_REJECTED = `${UPDATE_STANDARD_FILING_FIELD_OPTION}_REJECTED`;

export function updateStandardFilingFieldOption(fieldId, model) {
  return {
    type: UPDATE_STANDARD_FILING_FIELD_OPTION,
    payload: http.put(`standard-filing-fields/${fieldId}/options/${model.get('id')}`, model),
  };
}
