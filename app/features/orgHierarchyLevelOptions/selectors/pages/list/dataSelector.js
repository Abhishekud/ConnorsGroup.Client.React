import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import orgHierarchyLevelOptionsSelector from './orgHierarchyLevelOptionsSelector';
import selectedOrgHierarchyLevelOptionIdSelector from './selectedOrgHierarchyLevelOptionIdSelector';
import {fromJS} from 'immutable';


const selectedDataSelector = createSelector(
  orgHierarchyLevelOptionsSelector,
  selectedOrgHierarchyLevelOptionIdSelector,
  (data, selected) => (selected === null ? data : data.map(d => d.set('selected', d.get('id') === selected)))
);


export default createSelector(
  selectedDataSelector,
  filterSelector,
  sortSelector,
  (orgHierarchyLevelOptions, filter, sort) => {
    const mappedData = Object.values(orgHierarchyLevelOptions.toJS());
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(mappedData, f), sort.toJS()));
  }
);
