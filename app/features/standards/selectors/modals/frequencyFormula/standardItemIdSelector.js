import {createSelector} from 'reselect';
import modalSelector from './modalSelector';

export default createSelector(
  modalSelector,
  modal => modal.get('standardItemId'),
);
