import {createSelector} from 'reselect';
import activitiesSelector from './activitiesSelector';
import sortSelector from './sortSelector';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import filterSelector from './filterSelector';
import selectedActivityIdSelector from './selectedActivityIdSelector';

const selectedDataSelector = createSelector(
  activitiesSelector,
  selectedActivityIdSelector,
  (data, selected) => (selected === null ? data : data.map(d => d.set('selected', d.get('id') === selected)))
);

export default createSelector(
  selectedDataSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const activities = Object.values(data.toJS());
    const f = filterBy(activities, filter === null ? null : filter.toJS());
    return orderBy(f, sort.toJS());
  }
);
