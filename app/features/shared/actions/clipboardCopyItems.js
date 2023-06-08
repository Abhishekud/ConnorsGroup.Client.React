export const CLIPBOARD_COPY_ITEMS = 'CLIPBOARD_COPY_ITEMS';


export function clipboardCopyItems(copiedItems) {
  return {
    type: CLIPBOARD_COPY_ITEMS,
    payload: {
      copiedItems,
    },
  };
}
