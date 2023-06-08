import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const modelSelector = createSelector(
  pageSelector,
  page => page.get('location')
);

export default modelSelector;
