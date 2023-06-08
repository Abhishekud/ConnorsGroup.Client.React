import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import filteredClassificationsArraySelector from './filteredClassificationsArraySelector';
import sortSelector from './sortSelector';

export default createSelector(
  filteredClassificationsArraySelector,
  sortSelector,
  (classifications, sort) => orderBy(classifications, sort)
);
