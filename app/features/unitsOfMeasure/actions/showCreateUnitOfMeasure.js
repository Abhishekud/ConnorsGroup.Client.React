export const SHOW_CREATE_UNIT_OF_MEASURE = 'SHOW_CREATE_UNIT_OF_MEASURE';

export function showCreateUnitOfMeasure(departmentId) {
  return {
    type: SHOW_CREATE_UNIT_OF_MEASURE,
    payload: departmentId,
  };
}
