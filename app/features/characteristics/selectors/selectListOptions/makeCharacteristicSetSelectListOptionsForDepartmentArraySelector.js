import {createSelector} from 'reselect';
import characteristicSetSelectListOptionsSelector from './characteristicSetSelectListOptionsSelector';
import memoize from 'lodash/memoize';

export default createSelector(
  characteristicSetSelectListOptionsSelector,
  characteristicSetSelectListOptions => memoize(
    departmentId => {
      const list = characteristicSetSelectListOptions
        .filter(slo => slo.get('departmentId') === Number(departmentId))
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: ''});
      return list;
    })
);
