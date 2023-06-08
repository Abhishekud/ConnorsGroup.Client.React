import {Map} from 'immutable';
import {
  GENERATE_PDF_PENDING,
  GENERATE_PDF_REJECTED,
  CREATE_PDF_DOWNLOAD_FULFILLED,
  CREATE_PDF_DOWNLOAD_REJECTED,
} from '../../actions';

const initialState = Map({
  generating: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GENERATE_PDF_PENDING:
      return state.set('generating', true);

    case GENERATE_PDF_REJECTED:
    case CREATE_PDF_DOWNLOAD_FULFILLED:
    case CREATE_PDF_DOWNLOAD_REJECTED:
      return state.set('generating', false);

    default:
      return state;
  }
}
