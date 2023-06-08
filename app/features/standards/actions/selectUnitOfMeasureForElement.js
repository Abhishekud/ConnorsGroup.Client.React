export const SELECT_UNIT_OF_MEASURE_FOR_ELEMENT = 'SELECT_UNIT_OF_MEASURE_FOR_ELEMENT';

export function selectUnitOfMeasureForElement(unitOfMeasure) {
  return {
    type: SELECT_UNIT_OF_MEASURE_FOR_ELEMENT,
    payload: unitOfMeasure,
  };
}
