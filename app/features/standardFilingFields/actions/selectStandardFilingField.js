export const SELECT_STANDARD_FILING_FIELD = 'SELECT_STANDARD_FILING_FIELD';

export function selectStandardFilingField(standardFilingField) {
  return {
    type: SELECT_STANDARD_FILING_FIELD,
    payload: standardFilingField,
  };
}
