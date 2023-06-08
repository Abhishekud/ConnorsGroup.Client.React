import {combineReducers} from 'redux';
import list from './list';
import downloadsList from './downloadsList';

export default combineReducers({
  list,
  downloadsList,
});
