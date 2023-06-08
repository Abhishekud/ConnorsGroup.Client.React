import {createSelector} from 'reselect';
import {allOrgHierarchyLevelOptionsSelector} from '../../../orgHierarchyLevelOptions/selectors/pages/list';

export default createSelector(
  allOrgHierarchyLevelOptionsSelector,
  orgHierarchyLevelOptions =>
    orgHierarchyLevelOptions
      .filter(opt => opt.get('parentOrgHierarchyLevelOptionId') === null)
      .valueSeq()
      .toArray()
      .map(o => ({value: o.get('id'), label: o.get('value')}))
);
