export const SHOW_DELETE_STANDARD_FILING_FIELD = 'SHOW_DELETE_STANDARD_FILING_FIELD';

export function showDeleteStandardFilingField(standardFilingField) {
  return {
    type: SHOW_DELETE_STANDARD_FILING_FIELD,
    payload: standardFilingField,
  };
}
