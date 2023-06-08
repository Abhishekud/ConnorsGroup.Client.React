import {http} from '../../shared/services';

export const CREATE_STANDARD_FILING_FIELD_OPTION = 'CREATE_STANDARD_FILING_FIELD_OPTION';
export const CREATE_STANDARD_FILING_FIELD_OPTION_PENDING = `${CREATE_STANDARD_FILING_FIELD_OPTION}_PENDING`;
export const CREATE_STANDARD_FILING_FIELD_OPTION_FULFILLED = `${CREATE_STANDARD_FILING_FIELD_OPTION}_FULFILLED`;
export const CREATE_STANDARD_FILING_FIELD_OPTION_REJECTED = `${CREATE_STANDARD_FILING_FIELD_OPTION}_REJECTED`;

export function createStandardFilingFieldOption(standardFilingFieldId, model) {
  return {
    type: CREATE_STANDARD_FILING_FIELD_OPTION,
    payload: http.post(`standard-filing-fields/${standardFilingFieldId}/options`, model),
  };
}
