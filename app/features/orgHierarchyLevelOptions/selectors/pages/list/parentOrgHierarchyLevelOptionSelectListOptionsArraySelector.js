import {createSelector} from 'reselect';
import selectedOrgHierarchyLevelNumberSelector from './selectedOrgHierarchyLevelNumberSelector';
import orgHierarchyLevelsSelector from '../../pages/list/orgHierarchyLevelsSelector';
import allOrgHierarchyLevelOptionsSelector from '../../pages/list/allOrgHierarchyLevelOptionsSelector';

export default createSelector(
  selectedOrgHierarchyLevelNumberSelector,
  orgHierarchyLevelsSelector,
  allOrgHierarchyLevelOptionsSelector,
  (selectedOrgHierarchyLevelNumber, orgHierarchyLevels, allOrgHierarchyLevelOptions) => {

    if (selectedOrgHierarchyLevelNumber > 1) {
      const parentOrgHierarchyLevelNumber = selectedOrgHierarchyLevelNumber - 1;
      const parentOrgHierarchyLevel = orgHierarchyLevels.find(ohl => ohl.number === parentOrgHierarchyLevelNumber);

      if (parentOrgHierarchyLevel) {
        return allOrgHierarchyLevelOptions
          .filter(ohlo => ohlo.get('orgHierarchyLevelId') === parentOrgHierarchyLevel.id)
          .sortBy(ohlo => ohlo.get('value'))
          .map(ohlo => ({value: ohlo.get('id'), label: ohlo.get('value')}))
          .valueSeq()
          .toArray();
      }
    }

    return [];
  }
);
