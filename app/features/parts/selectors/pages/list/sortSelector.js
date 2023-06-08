import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedPartFamilyIdSelector from './selectedPartFamilyIdSelector';
import {List} from 'immutable';

const sortingSelector = createSelector(
  pageSelector,
  page => page.get('sort')
);

export default createSelector(
  sortingSelector,
  selectedPartFamilyIdSelector,
  (sort, selectedPartFamilyId) => {
    if (sort.get(selectedPartFamilyId)) {
      return sort.get(selectedPartFamilyId);
    }
    return new List();
  }
);
