import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import standardFilingFieldOptionsArraySelector from './standardFilingFieldOptionsArraySelector';
import filterSelector from './filterSelector';

export default createSelector(
  standardFilingFieldOptionsArraySelector,
  filterSelector,
  (standardFilingFieldOptions, filter) => filterBy(standardFilingFieldOptions, filter)
);
