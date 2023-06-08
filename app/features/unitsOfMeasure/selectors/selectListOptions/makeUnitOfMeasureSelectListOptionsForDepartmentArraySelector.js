import {createSelector} from 'reselect';
import unitsOfMeasureSelectListOptionsSelector from './unitsOfMeasureSelectListOptionsSelector';
import memoize from 'lodash/memoize';

export default createSelector(
  unitsOfMeasureSelectListOptionsSelector,
  unitsOfMeasureSelectListOptions => memoize(
    departmentId => {
      const list = unitsOfMeasureSelectListOptions
        .filter(slo => slo.get('departmentId') === Number(departmentId))
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: ''});
      return list;
    })
);
