export const SORT_STANDARD_FILING_FIELDS_LIST = 'SORT_STANDARD_FILING_FIELDS_LIST';

export function sortStandardFilingFieldsList(sortBy, sortDirection) {
  return {
    type: SORT_STANDARD_FILING_FIELDS_LIST,
    payload: {sortBy, sortDirection},
  };
}
