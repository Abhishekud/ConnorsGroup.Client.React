import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS, Map} from 'immutable';
import locationsSelector from './locationsSelector';
import locationsAttributesSelector from './locationsAttributesSelector';
import attributesSelector from './attributesSelector';
import orgHierarchiesSelector from './orgHierarchiesSelector';

const expandedLocationsSelector = createSelector(
  locationsSelector,
  orgHierarchiesSelector,
  (locations, orgHierarchies) =>
    locations.map(location => location.merge(orgHierarchies.get(location.get('parentOrgHierarchyLevelOptionId'), new Map()).map(oh => oh.get('value'))))
);

const aggregatedDataSelector = createSelector(
  expandedLocationsSelector,
  locationsAttributesSelector,
  attributesSelector,
  (locations, locationAttributes, attributes) =>
    locations.map(location => {
      const attrSettings = locationAttributes.get(location.get('id'));

      return attributes
        .reduce((l, att) => l.set(`attribute_${att.get('id')}`, attrSettings.contains(att.get('id'))), location)
        .merge(location)
        .set('inEdit', true);
    }).toList()
);

export default createSelector(
  aggregatedDataSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => fromJS(orderBy(filterBy(data.toJS(), (filter === null ? null : filter.toJS())), sort.toJS()))
);
