export const TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_VISIBILITY = 'TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_VISIBILITY';

export function toggleVolumeDriverMappingColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_VOLUME_DRIVER_MAPPING_COLUMN_VISIBILITY,
    payload: {field, visibility, finalColumns, selectedColumn},
  };
}

export default toggleVolumeDriverMappingColumnVisibility;

