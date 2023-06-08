export const TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR = 'TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR';
export const TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR_FULFILLED = `${TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR}_FULFILLED`;

export function toggleElementsGridConfigurationSidebar(field, visibility) {
  return {
    type: TOGGLE_ELEMENTS_GRID_CONFIGURATION_SIDEBAR,
    payload: Promise.resolve({field, visibility}),
  };
}

export default toggleElementsGridConfigurationSidebar;

