export const TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleUnitOfMeasureStandardsGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_UNIT_OF_MEASURE_STANDARDS_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleUnitOfMeasureStandardsGridConfigurationSidebar;

