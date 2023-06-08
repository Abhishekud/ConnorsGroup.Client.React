import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import usersSelector from './usersSelector';
import {fromJS} from 'immutable';


export default createSelector(
  usersSelector,
  filterSelector,
  sortSelector,
  (mappedData, filter, sort) => {
    const f = filter === null ? null : filter.toJS();
    const users = Object.values(mappedData.toJS());
    users.forEach(values => {
      values.lastLoginDate = values.lastLoginDate === null ? null : new Date(values.lastLoginDate);
      values.roleInstring = values.roles.join(', ');
    });
    return fromJS(orderBy(filterBy(users, f), sort.toJS()));
  }
);
