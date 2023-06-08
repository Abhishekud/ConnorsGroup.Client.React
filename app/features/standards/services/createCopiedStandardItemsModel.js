/**
 * Description: Accept source standard id, selected standard items, list of all standard items and
 * selectd standard element group ids, prepares list of ids of selected groups and ids of selected
 * elements other than these selected groups and returns list along with source standard id.
 * @param {*} sourceStandardId - Id of standard from which items are copied.
 * @param {*} selectedStandardItems - List of selected standard items.
 * @param {*} allStandardItems - List of all standard items.
 * @param {*} selectedStandardElementGroupIds - List of ids of selected standard element groups.
 * @returns Object with SourceStandardId and CopiedItems.
 */
export default function createCopiedStandardItemsModel(sourceStandardId, selectedStandardItems, allStandardItems, selectedStandardElementGroupIds) {
  let copiedItems = [];

  // selectedStandardItems contains only standard elements which are selected
  const selectedStandardElementIds = selectedStandardItems.map(item => item.id).keySeq().toArray();

  const selectedStandardItemIds = [...selectedStandardElementGroupIds, ...selectedStandardElementIds];
  const sortedAllStandardItems = allStandardItems.toList().sortBy(f => f.get('index'));

  // Add all the items(standard elements and standard element groups) which are selected, excluding selected child elements if the whole group is selected.
  sortedAllStandardItems.forEach(item => {
    if ((selectedStandardItemIds.some(x => x === item.id)) && (!selectedStandardElementGroupIds.some(x => x === item.standardElementGroupId))) {
      copiedItems = copiedItems.concat(Object({type: item.type, id: item.id, concurrencyToken: item.concurrencyToken}));
    }
  });

  return Object({sourceStandardId, copiedItems});
}
