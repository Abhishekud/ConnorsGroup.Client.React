export const RESET_LOCKED_LOCATION_MAPPING_COLUMNS = 'RESET_LOCKED_LOCATION_MAPPING_COLUMNS';
export const RESET_LOCKED_LOCATION_MAPPING_COLUMNS_FULFILLED = `${RESET_LOCKED_LOCATION_MAPPING_COLUMNS}_FULFILLED`;

export function resetLockedLocationMappingColumns() {
  return {
    type: RESET_LOCKED_LOCATION_MAPPING_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedLocationMappingColumns;
