import {fromJS} from 'immutable';
export const FILTER_LOCATIONS_STANDARDS_EXPORT_LIST = 'FILTER_LOCATIONS_STANDARDS_EXPORT_LIST';
export const FILTER_LOCATIONS_STANDARDS_EXPORT_LIST_FULFILLED = `${FILTER_LOCATIONS_STANDARDS_EXPORT_LIST}_FULFILLED`;

export function filterLocationsStandardsExportList(filter) {
  return {
    type: FILTER_LOCATIONS_STANDARDS_EXPORT_LIST,
    payload: Promise.resolve(fromJS(filter)),
  };
}

export default filterLocationsStandardsExportList;
