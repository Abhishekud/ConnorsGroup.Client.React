import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import filteredLaborCategoriesArraySelector from './filteredLaborCategoriesArraySelector';
import sortSelector from './sortSelector';

export default createSelector(
  filteredLaborCategoriesArraySelector,
  sortSelector,
  (laborCategories, sort) => orderBy(laborCategories, sort)
);
