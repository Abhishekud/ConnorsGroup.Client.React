/**
 * Description: Accept copied standard items model, destination standard id, index where items are pasted and
 * group id in which copied items are pasted, returns model with addition of destination details.
 * @param {*} copiedStandardItemsModelFromClipboard - Model having list of copied items and source standard id.
 * @param {*} destinationStandardId - Destination standard id.
 * @param {*} destinationStandardItemIndex - Index position where items are pasted.
 * @param {*} destinationElementGroupId - Group id in which copied items are pasted.
 * @returns Object with sourceStandardId and copiedItems, destinationStandardItemIndex, destinationStandardId, destinationElementGroupId and destinationStandardItemConcurrencyToken.
 */
export default function pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboard, destinationStandardId, destinationStandardItemIndex, destinationElementGroupId, allStandardItems) {
  copiedStandardItemsModelFromClipboard.destinationStandardItemIndex = destinationStandardItemIndex;
  copiedStandardItemsModelFromClipboard.destinationStandardId = destinationStandardId;
  copiedStandardItemsModelFromClipboard.destinationElementGroupId = destinationElementGroupId;
  copiedStandardItemsModelFromClipboard.destinationStandardItemConcurrencyToken = allStandardItems.find(x => x.get('index') === destinationStandardItemIndex) ? allStandardItems.find(x => x.get('index') === destinationStandardItemIndex).concurrencyToken : null;
  return copiedStandardItemsModelFromClipboard;
}
