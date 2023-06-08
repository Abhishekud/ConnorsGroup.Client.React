export const SORT_STANDARD_FILING_FIELD_OPTIONS_LIST = 'SORT_STANDARD_FILING_FIELD_OPTIONS_LIST';

export function sortStandardFilingFieldOptionsList(sort) {
  return {
    type: SORT_STANDARD_FILING_FIELD_OPTIONS_LIST,
    payload: sort,
  };
}
