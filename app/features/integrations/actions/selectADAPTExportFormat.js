export const SELECT_ADAPT_EXPORT_FORMAT = 'SELECT_ADAPT_EXPORT_FORMAT';
export const SELECT_ADAPT_EXPORT_FORMAT_FULFILLED = `${SELECT_ADAPT_EXPORT_FORMAT}_FULFILLED`;

export function selectADAPTExportFormat(exportFormat) {
  return {
    type: SELECT_ADAPT_EXPORT_FORMAT,
    payload: (new Promise(resolve => resolve(exportFormat))),
  };
}

export default selectADAPTExportFormat;
