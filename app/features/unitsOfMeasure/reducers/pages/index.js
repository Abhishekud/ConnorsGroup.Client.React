import {combineReducers} from 'redux';
import list from './list';
import unitOfMeasureStandardsList from './unitOfMeasureStandardsList';

export default combineReducers({
  list,
  unitOfMeasureStandardsList,
});
