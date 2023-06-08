export const SET_FREQUENCY_FORMULA_MODAL_VALUE = 'SET_FREQUENCY_FORMULA_MODAL_VALUE';

export function setFrequencyFormulaModalValue(name, value) {
  return {
    type: SET_FREQUENCY_FORMULA_MODAL_VALUE,
    payload: {name, value},
  };
}
