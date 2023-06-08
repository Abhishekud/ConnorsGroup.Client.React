export const SELECT_STANDARD_FILING_FIELD_OPTION = 'SELECT_STANDARD_FILING_FIELD_OPTION';

export function selectStandardFilingFieldOption(standardFilingFieldId, standardFilingFieldOption) {
  return {
    type: SELECT_STANDARD_FILING_FIELD_OPTION,
    payload: {standardFilingFieldId, standardFilingFieldOption},
  };
}
