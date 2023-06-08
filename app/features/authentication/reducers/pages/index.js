import {combineReducers} from 'redux';
import logIn from './logIn';
import terms from './terms';
import verifyUser from './verifyUser';

export default combineReducers({
  logIn,
  terms,
  verifyUser,
});
