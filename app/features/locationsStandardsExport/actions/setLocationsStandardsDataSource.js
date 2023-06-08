export const SET_LOCATIONS_STANDARDS_DATA_SOURCE = 'SET_LOCATIONS_STANDARDS_DATA_SOURCE';

export function setLocationsStandardsDataSource(dataSource) {
  return {
    type: SET_LOCATIONS_STANDARDS_DATA_SOURCE,
    payload: {dataSource},
  };
}
