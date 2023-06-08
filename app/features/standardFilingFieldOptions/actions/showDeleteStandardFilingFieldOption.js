export const SHOW_DELETE_STANDARD_FILING_FIELD_OPTION = 'SHOW_DELETE_STANDARD_FILING_FIELD_OPTION';

export function showDeleteStandardFilingFieldOption(standardFilingFieldId, standardFilingFieldOption) {
  return {
    type: SHOW_DELETE_STANDARD_FILING_FIELD_OPTION,
    payload: {standardFilingFieldId, standardFilingFieldOption},
  };
}
