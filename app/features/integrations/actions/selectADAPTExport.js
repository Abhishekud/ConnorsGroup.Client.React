export const SELECT_ADAPT_EXPORT = 'SELECT_ADAPT_EXPORT';
export const SELECT_ADAPT_EXPORT_FULFILLED = `${SELECT_ADAPT_EXPORT}_FULFILLED`;

export function selectADAPTExport(exportType) {
  return {
    type: SELECT_ADAPT_EXPORT,
    payload: (new Promise(resolve => resolve(exportType))),
  };
}

export default selectADAPTExport;
