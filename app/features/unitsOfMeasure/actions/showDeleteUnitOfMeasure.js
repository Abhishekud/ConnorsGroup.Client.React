export const SHOW_DELETE_UNIT_OF_MEASURE = 'SHOW_DELETE_UNIT_OF_MEASURE';

export function showDeleteUnitOfMeasure(unitOfMeasure) {
  return {
    type: SHOW_DELETE_UNIT_OF_MEASURE,
    payload: unitOfMeasure,
  };
}
