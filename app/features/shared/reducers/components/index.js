import {combineReducers} from 'redux';
import navigation from './navigation';
import timeFormatSelector from './timeFormatSelector';
import clientBrand from './clientBrand';
import settings from './settings';
import clipboard from './clipboard';

export default combineReducers({
  navigation,
  timeFormatSelector,
  clientBrand,
  settings,
  clipboard,
});
