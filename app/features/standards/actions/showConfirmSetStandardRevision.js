export const SHOW_CONFIRM_SET_STANDARD_REVISION = 'SHOW_CONFIRM_SET_STANDARD_REVISION';

export function showConfirmSetStandardRevision(standardId, revisionNumber, hasInactiveCharacteristics, hasInactiveUnitsOfMeasure) {
  return {
    type: SHOW_CONFIRM_SET_STANDARD_REVISION,
    payload: {standardId, revisionNumber, hasInactiveCharacteristics, hasInactiveUnitsOfMeasure},
  };
}
