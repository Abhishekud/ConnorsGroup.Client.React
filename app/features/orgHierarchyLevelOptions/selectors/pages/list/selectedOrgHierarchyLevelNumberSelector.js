import {createSelector} from 'reselect';
import selectedOrgHierarchyLevelIdSelector from '../../pages/list/selectedOrgHierarchyLevelIdSelector';
import orgHierarchyLevelsSelector from '../../pages/list/orgHierarchyLevelsSelector';

export default createSelector(
  selectedOrgHierarchyLevelIdSelector,
  orgHierarchyLevelsSelector,
  (selectedOrgHierarchyLevelId, orgHierarchyLevels) =>
    (selectedOrgHierarchyLevelId ? orgHierarchyLevels.get(selectedOrgHierarchyLevelId).number : 0)
);
