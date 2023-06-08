
export const SELECT_ELEMENT_UNIT_OF_MEASURE = 'SELECT_ELEMENT_UNIT_OF_MEASURE';

export function selectUnitOfMeasure(unitOfMeasure) {
  return {
    type: SELECT_ELEMENT_UNIT_OF_MEASURE,
    payload: unitOfMeasure,
  };
}
