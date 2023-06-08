export const SELECT_KRONOS_LABOR_STANDARD = 'SELECT_KRONOS_LABOR_STANDARD';

export function selectKronosLaborStandard(laborStandard) {
  return {
    type: SELECT_KRONOS_LABOR_STANDARD,
    payload: {
      laborStandard,
    },
  };
}
