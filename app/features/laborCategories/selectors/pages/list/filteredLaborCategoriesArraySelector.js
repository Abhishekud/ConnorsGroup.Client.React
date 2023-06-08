import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import laborCategoriesArraySelector from './laborCategoriesArraySelector';
import filterSelector from './filterSelector';

export default createSelector(
  laborCategoriesArraySelector,
  filterSelector,
  (laborCategories, filter) => filterBy(laborCategories, filter)
);
