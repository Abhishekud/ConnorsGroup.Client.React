import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const selectedAttributeSelector = createSelector(
  pageSelector,
  page => page.get('selectedAttributeId')
);

export default selectedAttributeSelector;

