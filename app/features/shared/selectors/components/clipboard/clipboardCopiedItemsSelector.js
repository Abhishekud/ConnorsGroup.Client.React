import {createSelector} from 'reselect';
import clipboardSelector from './clipboardSelector';

export default createSelector(
  clipboardSelector,
  clipboard => clipboard.get('copiedItems')
);
