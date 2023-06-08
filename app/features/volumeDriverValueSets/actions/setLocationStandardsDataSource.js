export const SET_LOCATION_STANDARDS_DATA_SOURCE = 'SET_LOCATION_STANDARDS_DATA_SOURCE';

export function setLocationStandardsDataSource(dataSource) {
  return {
    type: SET_LOCATION_STANDARDS_DATA_SOURCE,
    payload: {dataSource},
  };
}
