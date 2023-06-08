export const RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION = 'RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION';
export const RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION_FULFILLED = `${RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION}_FULFILLED`;

export function resetLocationDepartmentsGridConfiguration() {
  return {
    type: RESET_LOCATION_DEPARTMENTS_GRID_CONFIGURATION,
    payload: Promise.resolve(),
  };
}

export default resetLocationDepartmentsGridConfiguration;
