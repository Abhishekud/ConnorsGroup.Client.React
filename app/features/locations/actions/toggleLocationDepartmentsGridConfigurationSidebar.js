export const TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleLocationDepartmentsGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleLocationDepartmentsGridConfigurationSidebar;

