import {createSelector} from 'reselect';
import selectedOrgHierarchyLevelOptionSelector from './selectedOrgHierarchyLevelOptionSelector';

export default createSelector(
  selectedOrgHierarchyLevelOptionSelector,
  selectedOption => ({logic: 'and', filters: [{field: 'orgHierarchyLevelOption', value: selectedOption, operator: 'eq'}]})
);
