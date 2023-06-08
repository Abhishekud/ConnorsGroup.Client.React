
export const RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS = 'RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS';
export const RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS_FULFILLED = `${RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS}_FULFILLED`;

export function resetLockedVolumeDriverValuesColumns() {
  return {
    type: RESET_LOCKED_VOLUME_DRIVER_VALUES_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedVolumeDriverValuesColumns;
