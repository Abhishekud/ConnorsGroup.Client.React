export const SHOW_SKIP_TUMBLEWEED_EXPORT = 'SHOW_SKIP_TUMBLEWEED_EXPORT';

export function showSkipTumbleweedExport(model) {
  return {
    type: SHOW_SKIP_TUMBLEWEED_EXPORT,
    payload: model,
  };
}
