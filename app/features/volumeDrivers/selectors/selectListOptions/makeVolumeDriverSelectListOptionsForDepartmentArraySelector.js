import {createSelector} from 'reselect';
import volumeDriverSelectListOptionsSelector from './volumeDriverSelectListOptionsSelector';
import memoize from 'lodash/memoize';

export default createSelector(
  volumeDriverSelectListOptionsSelector,
  volumeDriverSelectListOptions => memoize(
    departmentId => {
      const list = volumeDriverSelectListOptions
        .filter(slo => slo.get('departmentId') === Number(departmentId))
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: ''});
      return list;
    })
);
