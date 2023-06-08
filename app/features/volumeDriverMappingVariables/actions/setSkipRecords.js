export const SET_SKIP_RECORDS = 'SET_SKIP_RECORDS';
export const SET_SKIP_RECORDS_PENDING = `${SET_SKIP_RECORDS}_PENDING`;
export const SET_SKIP_RECORDS_FULFILLED = `${SET_SKIP_RECORDS}_FULFILLED`;
export const SET_SKIP_RECORDS_REJECTED = `${SET_SKIP_RECORDS}_REJECTED`;

export function setSkipRecords(skip) {
  return {
    type: SET_SKIP_RECORDS,
    payload: Promise.resolve(skip),
  };
}
