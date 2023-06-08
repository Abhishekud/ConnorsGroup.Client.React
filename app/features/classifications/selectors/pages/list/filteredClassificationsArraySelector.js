import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import classificationsArraySelector from './classificationsArraySelector';
import filterSelector from './filterSelector';

export default createSelector(
  classificationsArraySelector,
  filterSelector,
  (classifications, filter) => filterBy(classifications, filter)
);
