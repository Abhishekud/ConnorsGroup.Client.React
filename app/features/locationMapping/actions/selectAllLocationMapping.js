export const SELECT_ALL_LOCATIONMAPPING_IN_LOCATION_MAPPING_LIST = 'SELECT_ALL_LOCATIONMAPPING_IN_LOCATION_MAPPING_LIST';

export function selectAllLocationMapping(ids, selected) {
  return {
    type: SELECT_ALL_LOCATIONMAPPING_IN_LOCATION_MAPPING_LIST,
    payload: {ids, selected},
  };
}
