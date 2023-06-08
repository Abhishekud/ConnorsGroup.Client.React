import {createSelector} from 'reselect';
import partFieldsSelector from './partFieldsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import {orderBy, filterBy} from '@progress/kendo-data-query';


export default createSelector(
  partFieldsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    const partFields = Object.values(data.toJS());
    return fromJS(orderBy(filterBy(partFields, f), sort.toJS()));
  }
);
