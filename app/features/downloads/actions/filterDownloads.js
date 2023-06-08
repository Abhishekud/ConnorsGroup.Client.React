export const FILTER_DOWNLOADS = 'FILTER_DOWNLOADS';

export function filterDownloads(filter) {
  return {
    type: FILTER_DOWNLOADS,
    payload: filter,
  };
}

