import {createSelector} from 'reselect';
import sidebarSelector from './sidebarSelector';

export default createSelector(
  sidebarSelector,
  modal => modal.get('validationErrors')
);
