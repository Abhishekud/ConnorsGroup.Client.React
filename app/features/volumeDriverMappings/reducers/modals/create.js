import {Map, List, fromJS} from 'immutable';
import {
  CANCEL_CREATE_VOLUME_DRIVER_MAPPING,
  CREATE_VOLUME_DRIVER_MAPPING_FULFILLED,
  CREATE_VOLUME_DRIVER_MAPPING_PENDING,
  CREATE_VOLUME_DRIVER_MAPPING_REJECTED,
  SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY,
  SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE,
  SHOW_CREATE_VOLUME_DRIVER_MAPPING,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    volumeDriverId: null,
    unitOfMeasureId: null,
    copyFromSetId: null,
    description: null,
    values: List(),
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_VOLUME_DRIVER_MAPPING:
      return initialState.set('show', true);

    case SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_CREATE_VOLUME_DRIVER_MAPPING_MODEL_SET_VALUE: {
      const {volumeDriverMappingSetId, value} = action.payload;
      let values = state.getIn(['model', 'values']);
      values = fromJS(values);
      const valueIndex = values.findIndex(v => v.get('volumeDriverMappingSetId') === volumeDriverMappingSetId);

      if (valueIndex < 0) {
        return state.setIn(['model', 'values'], values.push(Map({volumeDriverMappingSetId, value})));
      }

      return state.setIn(['model', 'values', valueIndex, 'value'], value);
    }

    case CREATE_VOLUME_DRIVER_MAPPING_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_VOLUME_DRIVER_MAPPING:
    case CREATE_VOLUME_DRIVER_MAPPING_FULFILLED:
      return initialState;

    case CREATE_VOLUME_DRIVER_MAPPING_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
