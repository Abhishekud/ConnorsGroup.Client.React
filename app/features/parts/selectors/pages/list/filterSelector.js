import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedPartFamilyIdSelector from './selectedPartFamilyIdSelector';

const filteringSelector = createSelector(
  pageSelector,
  page => page.get('filter')
);

export default createSelector(
  filteringSelector,
  selectedPartFamilyIdSelector,
  (filter, selectedPartFamilyId) => {
    if (filter.has(selectedPartFamilyId)) {
      return filter.get(selectedPartFamilyId);
    }
    return null;
  }
);
