import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedPartFamilyIdSelector from './selectedPartFamilyIdSelector';


const hiddenColumnSelector = createSelector(
  pageSelector,
  page => page.get('hiddenColumns')
);

export default createSelector(
  hiddenColumnSelector,
  selectedPartFamilyIdSelector,
  (hiddenColumn, selectedPartFamilyId) => {
    if (hiddenColumn.get(selectedPartFamilyId)) {
      return hiddenColumn.get(selectedPartFamilyId);
    }
    return new Map();
  }
);

