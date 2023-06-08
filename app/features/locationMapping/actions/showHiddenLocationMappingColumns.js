
export const SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS = 'SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS';
export const SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS_FULFILLED = `${SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS}_FULFILLED`;

export function showHiddenLocationMappingColumns() {
  return {
    type: SHOW_HIDDEN_LOCATION_MAPPING_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenLocationMappingColumns;
