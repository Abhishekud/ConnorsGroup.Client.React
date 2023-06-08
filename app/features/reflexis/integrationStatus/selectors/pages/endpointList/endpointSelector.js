import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

const endpointSelector = createSelector(
  pageSelector,
  page => page.get('endpoint')
);

export default endpointSelector;
