import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const loadingSelector = createSelector(
  pageSelector,
  page => page.get('loading')
);

export default loadingSelector;
