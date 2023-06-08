import {combineReducers} from 'redux';
import list from './list';
import standardProfile from './standardProfile';
import searchElements from './searchElements';
import mostStandardElementProfile from './mostStandardElementProfile';
import nonMOSTStandardElementProfile from './nonMOSTStandardElementProfile';
import revisionsList from './revisionsList';

export default combineReducers({
  list,
  standardProfile,
  searchElements,
  mostStandardElementProfile,
  nonMOSTStandardElementProfile,
  revisionsList,
});
