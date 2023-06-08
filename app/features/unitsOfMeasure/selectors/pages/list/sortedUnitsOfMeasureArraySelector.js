import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import filteredUnitsOfMeasureArraySelector from './filteredUnitsOfMeasureArraySelector';
import sortSelector from './sortSelector';

export default createSelector(
  filteredUnitsOfMeasureArraySelector,
  sortSelector,
  (unitsOfMeasure, sort) => orderBy(unitsOfMeasure, sort)
);
