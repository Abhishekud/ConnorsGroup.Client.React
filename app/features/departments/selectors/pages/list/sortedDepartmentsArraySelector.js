import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import filteredDepartmentsArraySelector from './filteredDepartmentsArraySelector';
import sortSelector from './sortSelector';

export default createSelector(
  filteredDepartmentsArraySelector,
  sortSelector,
  (departments, sort) => orderBy(departments, sort)
);
