import {fromJS, Map} from 'immutable';

export default function (initialModelState,
  resetFormActionType, setFormFieldActionType,
  pendingActionType, fulfilledActionType, rejectedActionType) {
  const initialState = new Map({
    submitting: false,
    validationErrors: new Map(),
    model: initialModelState,
  });

  return function (state = initialState, action) {
    switch (action.type) {
      case resetFormActionType:
        return initialState;

      case setFormFieldActionType: {
        const {payload} = action;
        return state.setIn(['model', payload.name], payload.value);
      }

      case pendingActionType:
        return state.set('submitting', true);

      case fulfilledActionType:
        return initialState;

      case rejectedActionType:
        return state.withMutations(map => {
          map.set('submitting', false);

          const {status, data} = action.payload.response || {};

          if (status === 400) {
            map.set('validationErrors', fromJS(data));
          } else {
            map.set('validationErrors', initialState.get('validationErrors'));
          }
        });

      default:
        return state;
    }
  };
}
