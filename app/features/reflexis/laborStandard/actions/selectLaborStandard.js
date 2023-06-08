export const SELECT_LABOR_STANDARD = 'REFLEXIS/LABOR_STANDARDS/SELECT_LABOR_STANDARD';

export function selectLaborStandard(id) {
  return {
    type: SELECT_LABOR_STANDARD,
    payload: {id},
  };
}
