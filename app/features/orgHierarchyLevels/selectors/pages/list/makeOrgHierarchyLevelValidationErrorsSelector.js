import {Map} from 'immutable';
import {createSelector} from 'reselect';
import orgHierarchyLevelsValidationErrorsSelector from './orgHierarchyLevelsValidationErrorsSelector';
import orgHierarchyLevelIdSelector from './orgHierarchyLevelIdSelector';

export default () =>
  createSelector(
    orgHierarchyLevelsValidationErrorsSelector,
    orgHierarchyLevelIdSelector,
    (orgHierarchyLevelsValidationErrors, orgHierarchyLevelId) => orgHierarchyLevelsValidationErrors.get(orgHierarchyLevelId) || Map()
  );
