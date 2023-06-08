import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import {DEFAULT_SORT as defaultSort} from '../../../constants/sorts';

export default createSelector(
  pageSelector,
  page => !page.get('sort') || page.get('sort').equals(defaultSort)
);
