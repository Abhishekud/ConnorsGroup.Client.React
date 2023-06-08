export const TOGGLE_LOCATION_MAPPING_COLUMN_LOCK = 'TOGGLE_LOCATION_MAPPING_COLUMN_LOCK';

export function toggleLocationMappingColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_LOCATION_MAPPING_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleLocationMappingColumnLock;
