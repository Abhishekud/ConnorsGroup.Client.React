import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import levelNumberSelector from './levelNumberSelector';

const filteringSelector = createSelector(
  pageSelector,
  page => page.get('filter')
);

export default createSelector(
  filteringSelector,
  levelNumberSelector,
  (filter, levelNumber) => {
    if (filter.has(levelNumber)) {
      return filter.get(levelNumber);
    }
    return null;
  }
);
