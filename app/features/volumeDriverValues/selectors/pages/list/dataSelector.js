import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import volumeDriverValuesSelector from './volumeDriverValuesSelector';
import orgHierarchiesSelector from './orgHierarchiesSelector';
import {Map, fromJS} from 'immutable';

const expandedLocationsSelector = createSelector(
  volumeDriverValuesSelector,
  orgHierarchiesSelector,
  (volumeDriverValues, orgHierarchyLevels) => volumeDriverValues.map(
    volumeDriverValues => volumeDriverValues.merge(
      orgHierarchyLevels.get(
        volumeDriverValues.get('locationParentOrgHierarchyLevelOptionId'), new Map())
        .map(oh => oh.get('value')))));

export default createSelector(
  expandedLocationsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const f = (filter === null ? null : filter.toJS());
    return fromJS(orderBy(filterBy(data.toJS(), f), sort.toJS()));
  }
);
