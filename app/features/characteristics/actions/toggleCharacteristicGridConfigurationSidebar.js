export const TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleCharacteristicGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_CHARACTERISTIC_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleCharacteristicGridConfigurationSidebar;

