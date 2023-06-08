export const TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleCharacteristicStandardsGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_CHARACTERISTIC_STANDARDS_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleCharacteristicStandardsGridConfigurationSidebar;

