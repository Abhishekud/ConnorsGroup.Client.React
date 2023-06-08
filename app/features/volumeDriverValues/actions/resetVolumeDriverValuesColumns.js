export const RESET_VOLUME_DRIVER_VALUES_COLUMNS = 'RESET_VOLUME_DRIVER_VALUES_COLUMNS';
export const RESET_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED = `${RESET_VOLUME_DRIVER_VALUES_COLUMNS}_FULFILLED`;

export function resetVolumeDriverValuesColumns() {
  return {
    type: RESET_VOLUME_DRIVER_VALUES_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetVolumeDriverValuesColumns;
