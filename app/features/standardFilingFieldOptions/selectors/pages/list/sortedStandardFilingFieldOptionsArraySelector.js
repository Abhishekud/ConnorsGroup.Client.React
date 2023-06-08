import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import filteredStandardFilingFieldOptionsArraySelector from './filteredStandardFilingFieldOptionsArraySelector';
import sortSelector from './sortSelector';

export default createSelector(
  filteredStandardFilingFieldOptionsArraySelector,
  sortSelector,
  (standardFilingFieldOptions, sort) => orderBy(standardFilingFieldOptions, sort)
);
