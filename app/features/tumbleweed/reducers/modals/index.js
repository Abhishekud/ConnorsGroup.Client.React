import {combineReducers} from 'redux';
import confirmResume from './confirmResume';
import edit from './edit';
import skip from './skip';
import _delete from './delete';

export default combineReducers({
  confirmResume,
  edit,
  skip,
  _delete,
});
