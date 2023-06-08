import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import orgHierarchyLevelsSelector from '../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import selectedOrgHierarchyLevelIdSelector from './selectedOrgHierarchyLevelIdSelector';

const primaryLevelColumnSelector = createSelector(
  pageSelector,
  page => page.get('primaryLevelColumn')
);

const secondaryLevelColumnSelector = createSelector(
  pageSelector,
  page => page.get('secondaryLevelColumn')
);

export default createSelector(
  orgHierarchyLevelsSelector,
  selectedOrgHierarchyLevelIdSelector,
  primaryLevelColumnSelector,
  secondaryLevelColumnSelector,
  (orgHierarchyLevels, selectedOrgHierarchyLevelId, primaryLevelColumn, secondaryLevelColumn) => {
    const isTopLevel = orgHierarchyLevels.size ? orgHierarchyLevels.first().id === selectedOrgHierarchyLevelId : false;
    const columns = isTopLevel ? primaryLevelColumn : secondaryLevelColumn;
    return columns;
  }
);
