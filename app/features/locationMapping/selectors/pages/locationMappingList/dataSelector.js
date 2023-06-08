import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import {fromJS, Map} from 'immutable';
import selectedLocationIdSelector from './selectedLocationIdSelector';
import locationsSelector from './locationsSelector';
import filterSelector from './filterSelector';
import orgHierarchiesSelector from './orgHierarchiesSelector';

const expandedLocationsSelector = createSelector(
  locationsSelector,
  orgHierarchiesSelector,
  (locations, orgHierarchies) =>
    locations.map(
      location => location.merge(
        orgHierarchies.get(
          location.get('parentOrgHierarchyLevelOptionId'), new Map())
          .map(oh => oh.get('value'))))
);

const aggregatedDataSelector = createSelector(
  expandedLocationsSelector,
  locations =>
    locations.map(location => location.set('inEdit', true))
);

const selectedDataSelector = createSelector(
  aggregatedDataSelector,
  selectedLocationIdSelector,
  (data, selected) => (selected === null ? data : data.setIn([selected, 'selected'], true)).toList()
);

export default createSelector(
  selectedDataSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => fromJS(orderBy(filterBy(data.toJS(), (filter === null ? null : filter.toJS())), sort.toJS()))
);
