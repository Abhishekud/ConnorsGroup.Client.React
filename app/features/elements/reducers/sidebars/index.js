import {combineReducers} from 'redux';
import bulkEdit from './bulkEdit';
import filters from './filters';
import mostElementProfile from './mostElementProfile';
import nonMOSTElementProfile from './nonMOSTElementProfile';
import bulkEditElements from './bulkEditElements';

export default combineReducers({
  bulkEdit,
  filters,
  mostElementProfile,
  nonMOSTElementProfile,
  bulkEditElements,
});
