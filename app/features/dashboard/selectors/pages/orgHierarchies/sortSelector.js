import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import levelNumberSelector from './levelNumberSelector';
import {List} from 'immutable';

const sortingSelector = createSelector(
  pageSelector,
  page => page.get('sort')
);

export default createSelector(
  sortingSelector,
  levelNumberSelector,
  (sort, levelNumber) => {
    if (sort.has(levelNumber)) {
      return sort.get(levelNumber);
    }
    const defaultSort = new List();
    return defaultSort;
  }
);
