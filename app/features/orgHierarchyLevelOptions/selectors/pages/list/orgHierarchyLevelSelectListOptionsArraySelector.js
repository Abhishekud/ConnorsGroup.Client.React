import {createSelector} from 'reselect';
import sortedOrgHierarchyLevelsSelector from './sortedOrgHierarchyLevelsSelector';

export default createSelector(
  sortedOrgHierarchyLevelsSelector,
  orgHierarchyLevels =>
    orgHierarchyLevels.valueSeq().toArray().map(o => ({value: o.id, label: `${o.number} - ${o.name}`}))
);
