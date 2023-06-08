
export const SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS = 'SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS';
export const SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED = `${SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS}_FULFILLED`;

export function showHiddenVolumeDriverValuesColumns() {
  return {
    type: SHOW_HIDDEN_VOLUME_DRIVER_VALUES_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenVolumeDriverValuesColumns;
