import {combineReducers} from 'redux';
import list from './list';
import characteristicStandardsList from './characteristicStandardsList';

export default combineReducers({
  list,
  characteristicStandardsList,
});
