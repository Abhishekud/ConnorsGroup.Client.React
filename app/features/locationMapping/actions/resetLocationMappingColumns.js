export const RESET_LOCATION_MAPPING_COLUMNS = 'RESET_LOCATION_MAPPING_COLUMNS';
export const RESET_LOCATION_MAPPING_COLUMNS_FULFILLED = `${RESET_LOCATION_MAPPING_COLUMNS}_FULFILLED`;

export function resetLocationMappingColumns() {
  return {
    type: RESET_LOCATION_MAPPING_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLocationMappingColumns;
