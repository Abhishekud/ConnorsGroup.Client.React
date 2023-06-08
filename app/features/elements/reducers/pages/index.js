import {combineReducers} from 'redux';
import list from './list';
import mostElementProfile from './mostElementProfile';
import nonMOSTElementProfile from './nonMOSTElementProfile';

export default combineReducers({
  list,
  mostElementProfile,
  nonMOSTElementProfile,
});
