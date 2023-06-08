import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filteredJobClassesArraySelector from './filteredJobClassesArraySelector';

export default createSelector(
  filteredJobClassesArraySelector,
  sortSelector,
  (jobClasses, sort) => orderBy(jobClasses, sort)
);
