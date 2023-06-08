export const SELECT_UNIT_OF_MEASURE = 'SELECT_UNIT_OF_MEASURE';

export function selectUnitOfMeasure(unitOfMeasure) {
  return {
    type: SELECT_UNIT_OF_MEASURE,
    payload: unitOfMeasure,
  };
}
