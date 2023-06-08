import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import unitsOfMeasureArraySelector from './unitsOfMeasureArraySelector';
import filterSelector from './filterSelector';

export default createSelector(
  unitsOfMeasureArraySelector,
  filterSelector,
  (unitsOfMeasure, filter) => filterBy(unitsOfMeasure, filter)
);
