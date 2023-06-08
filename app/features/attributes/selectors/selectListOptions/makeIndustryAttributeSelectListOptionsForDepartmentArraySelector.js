import {createSelector} from 'reselect';
import industryAttributeSelectListOptionsSelector from './industryAttributeSelectListOptionsSelector';
import memoize from 'lodash/memoize';

export default createSelector(
  industryAttributeSelectListOptionsSelector,
  industryAttributeSelectListOptions => memoize(
    departmentId => {
      const list = industryAttributeSelectListOptions
        .filter(slo => slo.get('departmentId') === Number(departmentId))
        .valueSeq()
        .toArray()
        .map(o => ({value: o.get('value'), label: o.get('label')}));
      list.unshift({value: '', label: ''});
      return list;
    })
);
