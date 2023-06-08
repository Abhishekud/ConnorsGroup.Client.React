export const SORT_DOWNLOADS = 'SORT_DOWNLOADS';

export function sortDownloads(sort) {
  return {
    type: SORT_DOWNLOADS,
    payload: sort,
  };
}

