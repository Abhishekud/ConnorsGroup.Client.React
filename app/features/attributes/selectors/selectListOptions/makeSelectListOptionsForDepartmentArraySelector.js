import {createSelector} from 'reselect';
import attributeSelectListOptionsSelector from './attributeSelectListOptionsSelector';
import memoize from 'lodash/memoize';

export default createSelector(
  attributeSelectListOptionsSelector,
  attributeSelectListOptions => memoize(
    departmentId => {
      const list = attributeSelectListOptions
        .filter(slo => slo.get('departmentId') === Number(departmentId))
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: ''});
      return list;
    })
);
