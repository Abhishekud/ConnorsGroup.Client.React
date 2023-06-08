export const SELECT_ATTRIBUTE = 'REFLEXIS/ATTRIBUTES/SELECT_ATTRIBUTE';

export function selectAttribute(id) {
  return {
    type: SELECT_ATTRIBUTE,
    payload: {id},
  };
}

