import {http} from '../../shared/services';

export const DELETE_STANDARD_FILING_FIELD_OPTION = 'DELETE_STANDARD_FILING_FIELD_OPTION';
export const DELETE_STANDARD_FILING_FIELD_OPTION_PENDING = `${DELETE_STANDARD_FILING_FIELD_OPTION}_PENDING`;
export const DELETE_STANDARD_FILING_FIELD_OPTION_FULFILLED = `${DELETE_STANDARD_FILING_FIELD_OPTION}_FULFILLED`;
export const DELETE_STANDARD_FILING_FIELD_OPTION_REJECTED = `${DELETE_STANDARD_FILING_FIELD_OPTION}_REJECTED`;

export function deleteStandardFilingFieldOption(fieldId, optionId) {
  return {
    type: DELETE_STANDARD_FILING_FIELD_OPTION,
    payload: http.delete(`standard-filing-fields/${fieldId}/options/${optionId}`),
  };
}
