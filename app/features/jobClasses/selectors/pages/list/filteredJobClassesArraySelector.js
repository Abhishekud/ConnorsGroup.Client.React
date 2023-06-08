
import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import filterSelector from './filterSelector';
import jobClassesArraySelector from './jobClassesArraySelector';

export default createSelector(
  jobClassesArraySelector,
  filterSelector,
  (jobClasses, filter) => filterBy(jobClasses, filter)
);
