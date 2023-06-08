export const LOAD_LOCATION_MAPPING_COLUMNS = 'LOAD_LOCATION_MAPPING_COLUMNS';

export function loadLocationMappingColumns(columns) {
  return {
    type: LOAD_LOCATION_MAPPING_COLUMNS,
    payload: columns,
  };
}
export default loadLocationMappingColumns;
