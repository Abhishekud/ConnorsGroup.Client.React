export const SET_EDIT_TUMBLEWEED_SCHEDULE_MODEL_PROPERTY = 'SET_EDIT_TUMBLEWEED_SCHEDULE_MODEL_PROPERTY';

export function setEditTumbleweedScheduleModelProperty(name, value) {
  return {
    type: SET_EDIT_TUMBLEWEED_SCHEDULE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
