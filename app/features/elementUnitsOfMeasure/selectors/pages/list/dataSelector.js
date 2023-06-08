import {createSelector} from 'reselect';
import sortSelector from './sortSelector';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import filterSelector from './filterSelector';
import unitsOfMeasureSelector from './unitsOfMeasureSelector';
import selectedUnitOfMeasureIdSelector from './selectedUnitOfMeasureIdSelector';

const selectedDataSelector = createSelector(
  unitsOfMeasureSelector,
  selectedUnitOfMeasureIdSelector,
  (data, selected) => (selected === null ? data : data.map(d => d.set('selected', d.get('id') === selected)))
);

export default createSelector(
  selectedDataSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const newData = Object.values(data.toJS());
    const f = filterBy(newData, filter === null ? null : filter.toJS());
    return orderBy(f, sort.toJS());
  }
);
