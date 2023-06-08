import {createSelector} from 'reselect';
import volumeDriverMappingSetSelectListOptionsSelector from './volumeDriverMappingSetSelectListOptionsSelector';
import memoize from 'lodash/memoize';

export default createSelector(
  volumeDriverMappingSetSelectListOptionsSelector,
  volumeDriverMappingSetSelectListOptions => memoize(
    departmentId => {
      const list = volumeDriverMappingSetSelectListOptions
        .filter(slo => slo.get('departmentId') === Number(departmentId))
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: ''});
      return list;
    })
);
