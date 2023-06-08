export const TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function togglePartsGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_PARTS_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default togglePartsGridConfigurationSidebar;

