import {createSelector} from 'reselect';
import pageSelector from './componentSelector';

export default createSelector(
  pageSelector,
  page => page.get('generating')
);
