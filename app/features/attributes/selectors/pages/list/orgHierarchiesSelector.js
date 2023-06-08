import {createSelector} from 'reselect';
import allOrgHierarchyLevelOptionsSelector from '../../../../orgHierarchyLevelOptions/selectors/pages/list/allOrgHierarchyLevelOptionsSelector';
import {Map} from 'immutable';

export default createSelector(
  allOrgHierarchyLevelOptionsSelector,
  orgHierarchyLevelOptions =>
    orgHierarchyLevelOptions.map(opt => {
      const hierarchy = new Map().asMutable();

      let id = opt.get('id');
      while (id !== null) {
        const option = orgHierarchyLevelOptions.get(id);
        hierarchy.set(`orghierarchylevel_${option.get('orgHierarchyLevelId')}`, option);
        id = option.get('parentOrgHierarchyLevelOptionId');
      }

      return hierarchy.asImmutable();
    })
);
