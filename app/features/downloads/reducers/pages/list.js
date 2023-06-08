import {
  UPDATE_DOWNLOAD_STATUS_VALUE,
} from '../../actions';
import {Map} from 'immutable';

const initialState = Map({
  loading: false,
  downloadStatus: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOWNLOAD_STATUS_VALUE: {
      return state.withMutations(map =>
        map.set('downloadStatus', action.payload));
    }

    default:
      return state;
  }
}
