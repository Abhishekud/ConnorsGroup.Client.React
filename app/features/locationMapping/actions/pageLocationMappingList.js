export const PAGE_LOCATION_MAPPING_LIST = 'PAGE_LOCATION_MAPPING_LIST';

export function pageLocationMappingList(skip) {
  return {
    type: PAGE_LOCATION_MAPPING_LIST,
    payload: skip,
  };
}
