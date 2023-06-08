import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import departmentsArraySelector from './departmentsArraySelector';
import filterSelector from './filterSelector';

export default createSelector(
  departmentsArraySelector,
  filterSelector,
  (departments, filter) => filterBy(departments, filter)
);
