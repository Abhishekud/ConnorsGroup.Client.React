import {Map} from 'immutable';
import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedDepartmentIdSelector from './selectedDepartmentIdSelector';


const hiddenColumnSelector = createSelector(
  pageSelector,
  page => page.get('hiddenColumns')
);

export default createSelector(
  hiddenColumnSelector,
  selectedDepartmentIdSelector,
  (hiddenColumn, selectedDepartmentId) => {
    if (hiddenColumn.get(selectedDepartmentId)) {
      return hiddenColumn.get(selectedDepartmentId);
    }
    return new Map();
  }
);

