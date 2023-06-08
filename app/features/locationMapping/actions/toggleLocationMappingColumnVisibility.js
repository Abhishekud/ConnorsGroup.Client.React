export const TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY = 'TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY';
export const TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleLocationMappingColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_LOCATION_MAPPING_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, selectedColumn}),
  };
}

export default toggleLocationMappingColumnVisibility;

