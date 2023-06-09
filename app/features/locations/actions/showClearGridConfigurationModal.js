export const SHOW_CLEAR_GRID_CONFIGURATION_MODAL = 'SHOW_CLEAR_GRID_CONFIGURATION_MODAL';
export const SHOW_CLEAR_GRID_CONFIGURATION_MODAL_PENDING = `${SHOW_CLEAR_GRID_CONFIGURATION_MODAL}_PENDING`;
export const SHOW_CLEAR_GRID_CONFIGURATION_MODAL_FULFILLED = `${SHOW_CLEAR_GRID_CONFIGURATION_MODAL}_FULFILLED`;
export const SHOW_CLEAR_GRID_CONFIGURATION_MODAL_REJECTED = `${SHOW_CLEAR_GRID_CONFIGURATION_MODAL}_REJECTED`;

export function showClearGridConfigurationModal() {
  return {
    type: SHOW_CLEAR_GRID_CONFIGURATION_MODAL,
    payload: Promise.resolve(),
  };
}
