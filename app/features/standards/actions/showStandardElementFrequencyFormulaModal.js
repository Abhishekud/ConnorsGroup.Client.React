export const SHOW_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA = 'SHOW_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA';

export function showStandardElementFrequencyFormulaModal(standardItemId, frequencyFormula, mode) {
  return {
    type: SHOW_STANDARD_ELEMENT_ITEM_FREQUENCY_FORMULA,
    payload: {standardItemId, frequencyFormula, mode},
  };
}
