import {createSelector} from 'reselect';
import partsSelector from './partsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import {orderBy, filterBy} from '@progress/kendo-data-query';


export default createSelector(
  partsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    const parts = Object.values(data.toJS());
    parts.forEach((value, key) => {
      (value.partFieldValues).forEach(partFieldValue => {
        parts[key][`partFieldValue${partFieldValue.partFieldId}`] = partFieldValue.value;
      });
    });
    return fromJS(orderBy(filterBy(parts, f), sort.toJS()));
  }
);
