export const TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleLocationMappingGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_LOCATION_MAPPING_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleLocationMappingGridConfigurationSidebar;

