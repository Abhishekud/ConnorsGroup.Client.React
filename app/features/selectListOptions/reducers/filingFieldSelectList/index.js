import {fromJS, Map} from 'immutable';
import {
  GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_FULFILLED,
} from '../../actions';

const initialState = new Map();

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_FULFILLED: {
      const {data} = action.payload;
      return state.withMutations(map => {
        map.clear();
        for (const result of data) {
          const list = fromJS(result.options)
            .valueSeq()
            .toArray()
            .map(o => ({value: o.get('value'), label: o.get('label')}));
          list.unshift({value: '', label: ''});
          map.setIn([result.filingFieldId, 'id'], result.filingFieldId);
          map.setIn([result.filingFieldId, 'name'], result.filingFieldName);
          map.setIn([result.filingFieldId, 'options'], list);
        }
      });
    }

    default:
      return state;
  }
}
