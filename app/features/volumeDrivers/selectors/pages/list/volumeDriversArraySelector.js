import {createSelector} from 'reselect';
import volumeDriversSelector from './volumeDriversSelector';

export default createSelector(
  volumeDriversSelector,
  vd => vd.toList().toJS()
);
