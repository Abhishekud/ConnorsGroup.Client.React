import {fromJS} from 'immutable';

export const SORT_ELEMENT_ACTIVITIES_LIST = 'SORT_ELEMENT_ACTIVITIES_LIST';

export function sortActivitiesList(sort) {
  return {
    type: SORT_ELEMENT_ACTIVITIES_LIST,
    payload: fromJS(sort),
  };
}
