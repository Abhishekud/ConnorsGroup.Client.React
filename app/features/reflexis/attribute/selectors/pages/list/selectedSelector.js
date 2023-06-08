import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const selectedSelector = createSelector(
  pageSelector,
  page => page.get('selected')
);

export default selectedSelector;
