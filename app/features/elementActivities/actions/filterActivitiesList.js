import {fromJS} from 'immutable';

export const FILTER_ELEMENT_ACTIVITIES_LIST = 'FILTER_ELEMENT_ACTIVITIES_LIST';

export function filterActivitiesList(filter) {
  return {
    type: FILTER_ELEMENT_ACTIVITIES_LIST,
    payload: fromJS(filter),
  };
}
