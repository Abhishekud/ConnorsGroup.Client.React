export const TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY = 'TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY';
export const TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleVolumeDriverValuesColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_VOLUME_DRIVER_VALUES_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, selectedColumn}),
  };
}

export default toggleVolumeDriverValuesColumnVisibility;
