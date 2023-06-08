import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import orgHierarchyLevelsSelector from '../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';

export default createSelector(
  orgHierarchyLevelsSelector,
  orgHierarchyLevels => orgHierarchyLevels.toOrderedMap()
    .withMutations(ohls => {
      for (const [id, value] of ohls) {
        const key = `orgHierarchyLevel_${value.id}`;
        ohls.set(key, fromJS({field: key, title: value.name, width: 200}));
        ohls.delete(id);
      }
      return ohls;
    })
);
