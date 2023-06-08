export const SELECT_DASHBORD_LABOR_PROJECTIONS_LEVEL_OPTION_ID = 'SELECT_DASHBORD_LABOR_PROJECTIONS_LEVEL_OPTION_ID';

export function selectDashboardLaborProjectionsLevelOptionId(levelOptionId, scrollPosition) {
  return {
    type: SELECT_DASHBORD_LABOR_PROJECTIONS_LEVEL_OPTION_ID,
    payload: {levelOptionId, scrollPosition},
  };
}
