export const SHOW_CREATE_STANDARD_FILING_FIELD_OPTION = 'SHOW_CREATE_STANDARD_FILING_FIELD_OPTION';

export function showCreateStandardFilingFieldOption(standardFilingFieldId) {
  return {
    type: SHOW_CREATE_STANDARD_FILING_FIELD_OPTION,
    payload: standardFilingFieldId,
  };
}
