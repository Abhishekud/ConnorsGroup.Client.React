import {Map, fromJS, List} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  LOAD_INDUSTRY_ELEMENTS_LIST_PENDING,
  LOAD_INDUSTRY_ELEMENTS_LIST_FULFILLED,
  LOAD_INDUSTRY_ELEMENTS_LIST_REJECTED,
  SELECT_INDUSTRY_ELEMENT,
  SELECT_ALL_INDUSTRY_ELEMENTS,
  SORT_INDUSTRY_ELEMENTS_LIST,
  TOGGLE_INDUSTRY_ELEMENTS_LIST,
  ADD_INDUSTRY_ELEMENTS_TO_CLIENT_FULFILLED,
  ADD_INDUSTRY_ELEMENTS_TO_CLIENT_REJECTED,
  FILTER_INDUSTRY_ELEMENTS_LIST,
} from '../../actions';

const initialState = Map({
  show: false,
  loading: false,
  selectedIndustrySourceId: null,
  industryElements: Map(),
  validationErrors: Map(),
  existingUnchangedElements: Map(),
  sort: new List(),
  filter: null,
  headerSelectionValue: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_INDUSTRY_ELEMENTS_LIST:
      return state.set('show', !state.get('show'));

    case LOAD_INDUSTRY_ELEMENTS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_INDUSTRY_ELEMENTS_LIST_FULFILLED: {
      const {selectedIndustrySourceId, industryElements, existingUnchangedElements} = action.payload.data;
      const newExistingUnchangedElements = modelsArrayToMapById(existingUnchangedElements);
      const newIndustryElements = industryElements.map(obj => ({...obj, selected: false, existingId: newExistingUnchangedElements.get(obj.id) ? newExistingUnchangedElements.get(obj.id).get('newId') : ''}));
      return state.withMutations(map =>
        map.set('loading', false)
          .set('selectedIndustrySourceId', selectedIndustrySourceId)
          .set('industryElements', modelsArrayToMapById(newIndustryElements))
          .set('existingUnchangedElements', newExistingUnchangedElements)
          .set('headerSelectionValue', false)
      );
    }

    case LOAD_INDUSTRY_ELEMENTS_LIST_REJECTED:
      return state.set('loading', false);

    case SORT_INDUSTRY_ELEMENTS_LIST: {
      return state.set('sort', action.payload);
    }

    case SELECT_INDUSTRY_ELEMENT: {
      const {id, selected} = action.payload;
      return state.setIn(['industryElements', id, 'selected'], selected)
        .withMutations(map => map.setIn(['headerSelectionValue'], !map.get('industryElements').some(s => !s.get('selected'))));
    }

    case SELECT_ALL_INDUSTRY_ELEMENTS:
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], action.payload.selected);
        map.update('industryElements', elements =>
          elements.map(element => element.set('selected', action.payload.selected)));
      });

    case ADD_INDUSTRY_ELEMENTS_TO_CLIENT_REJECTED: {
      return state.withMutations(map => {
        map.set('loading', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    }

    case ADD_INDUSTRY_ELEMENTS_TO_CLIENT_FULFILLED:
      return initialState;

    case FILTER_INDUSTRY_ELEMENTS_LIST: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', 0)
          .update('industryElements', industryElements => industryElements.map(industryElement => industryElement.set('selected', false)))
          .set('headerSelectionValue', false));
    }
    default:
      return state;
  }
}
