export const TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleVolumeDriverMappingGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_VOLUME_DRIVER_MAPPING_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleVolumeDriverMappingGridConfigurationSidebar;

