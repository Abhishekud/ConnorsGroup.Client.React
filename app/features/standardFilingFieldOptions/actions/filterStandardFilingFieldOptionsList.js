export const FILTER_STANDARD_FILING_FIELD_OPTIONS_LIST = 'FILTER_STANDARD_FILING_FIELD_OPTIONS_LIST';

export function filterStandardFilingFieldOptionsList(filter) {
  return {
    type: FILTER_STANDARD_FILING_FIELD_OPTIONS_LIST,
    payload: filter,
  };
}
