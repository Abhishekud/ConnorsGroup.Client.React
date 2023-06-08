import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import {StandardElementModel, StandardElementGroupModel} from '../models';
import StandardElementGroup from './StandardElementGroup';
import StandardElement from './StandardElement';
import {lowestElementStatus} from '../services';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {REORDER_STANDARDS_ITEMS} from '../actions';

export default function StandardItem({
  standardItem, standardItemsCount, standardElementGroupsCount,
  timeFormat, collapsed, commentCollapsed, commentEntered, disabled, disabledBulkEdit,
  childStandardItems, childStandardItemsCommentCollapsed, childStandardItemsCommentEntered,
  childStandardItemsAddStandardItemBelowCollapsed, onToggleSelectStandardElement, selectedStandardItems,
  addStandardItemAboveCollapsed, addStandardItemBelowCollapsed, addScrollNode, childStandardItemsStates,
  onEdit, onCommentChange, onToggleStandardElementGroup, onToggleSelectStandardElementsWithGroup,
  onMove, onMoveToGroup, onRemoveFromGroup, onMoveToPosition, onEditSteps, standardStatus,
  onDelete, onToggleComment, onCreateComment, onCancelCreateComment, onToggleAddStandardItem,
  onAddElementById, onAddElementsBySearch, onCreateStandardElement, onCreateStandardElementGroup,
  onPromoteToListElement, showPasteButton, onBulkPasteStandardItems, standardId, getElementForStandard,
  selectedStandardElementGroupIds, hasBetaAccess,
}) {
  if (standardItem.type === STANDARD_ELEMENT_GROUP) {
    const elementStatus = collapsed ? lowestElementStatus(childStandardItems.valueSeq()) : '';
    return (
      <Droppable droppableId={`${REORDER_STANDARDS_ITEMS}_${ standardItem.index.toString()}-${standardId}`} index={standardItem.index.toString()}
        type={`${REORDER_STANDARDS_ITEMS}_${ standardItem.index.toString()}-${standardId}`} >
        {provided => (
          <StandardElementGroup
            provided={provided}
            disabled={disabled}
            disabledBulkEdit={disabledBulkEdit}
            standardElementGroup={standardItem}
            collapsed={collapsed}
            standardStatus={standardStatus}
            childStandardItemsStates={childStandardItemsStates}
            onToggleSelectStandardElementsWithGroup={onToggleSelectStandardElementsWithGroup}
            lowestElementStatus={elementStatus}
            addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
            addStandardItemBelowCollapsed={addStandardItemBelowCollapsed}
            childStandardItems={childStandardItems}
            canMove={standardItemsCount > childStandardItems.size + 1}
            addScrollNode={addScrollNode}
            onEdit={onEdit}
            onToggleStandardElementGroup={onToggleStandardElementGroup}
            onMove={onMove}
            onMoveToPosition={onMoveToPosition}
            onDelete={onDelete}
            onToggleAddStandardItem={onToggleAddStandardItem}
            onAddElementById={onAddElementById}
            onAddElementsBySearch={onAddElementsBySearch}
            onCreateStandardElement={onCreateStandardElement}
            onCreateStandardElementGroup={onCreateStandardElementGroup}
            showPasteButton={showPasteButton}
            onBulkPasteStandardItems={onBulkPasteStandardItems}
            getElementForStandard={getElementForStandard}
            isGroupSelected={selectedStandardElementGroupIds.includes(standardItem.id)} >
            {childStandardItems.map(csi => {
              const standardItemId = csi.id;
              return (
                <Draggable key={standardItemId} draggableId={standardItemId.toString()} index={csi.get('index')} isDragDisabled={disabled}>
                  {(provided, snapshot) => (
                    <StandardElement
                      key={standardItemId}
                      standardId={standardId}
                      showDragDropController
                      provided={provided}
                      snapshot={snapshot}
                      disabled={disabled}
                      disabledBulkEdit={disabledBulkEdit}
                      standardElement={csi}
                      timeFormat={timeFormat}
                      onToggleSelectStandardElement={onToggleSelectStandardElement}
                      commentCollapsed={childStandardItemsCommentCollapsed.get(standardItemId)}
                      commentEntered={childStandardItemsCommentEntered.get(standardItemId)}
                      selectedStandardItems={selectedStandardItems}
                      addStandardItemAboveCollapsed
                      addStandardItemBelowCollapsed={childStandardItemsAddStandardItemBelowCollapsed.get(standardItemId)}
                      canMove={standardItemsCount > 1}
                      standardElementGroupsCount={standardElementGroupsCount}
                      addScrollNode={addScrollNode}
                      onMove={onMove}
                      onMoveToGroup={onMoveToGroup}
                      onRemoveFromGroup={onRemoveFromGroup}
                      onMoveToPosition={onMoveToPosition}
                      onEditSteps={onEditSteps}
                      onDelete={onDelete}
                      onPromoteToListElement={onPromoteToListElement}
                      onToggleComment={onToggleComment}
                      onCommentChange={onCommentChange}
                      onCreateComment={onCreateComment}
                      onCancelCreateComment={onCancelCreateComment}
                      onToggleAddStandardItem={onToggleAddStandardItem}
                      onAddElementById={onAddElementById}
                      onAddElementsBySearch={onAddElementsBySearch}
                      onCreateStandardElement={onCreateStandardElement}
                      onCreateStandardElementGroup={onCreateStandardElementGroup}
                      showPasteButton={showPasteButton}
                      onBulkPasteStandardItems={onBulkPasteStandardItems}
                      getElementForStandard={getElementForStandard}
                      hasBetaAccess={hasBetaAccess} />
                  )}
                </Draggable>
              );
            })}
          </StandardElementGroup>
        )}
      </Droppable>
    );
  }

  return (
    <StandardElement
      standardId={standardId}
      disabled={disabled}
      disabledBulkEdit={disabledBulkEdit}
      standardElement={standardItem}
      timeFormat={timeFormat}
      commentCollapsed={commentCollapsed}
      commentEntered={commentEntered}
      onToggleSelectStandardElement={onToggleSelectStandardElement}
      addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
      addStandardItemBelowCollapsed={addStandardItemBelowCollapsed}
      selectedStandardItems={selectedStandardItems}
      canMove={standardItemsCount > 1}
      standardElementGroupsCount={standardElementGroupsCount}
      addScrollNode={addScrollNode}
      onEdit={onEdit}
      onMove={onMove}
      onMoveToGroup={onMoveToGroup}
      onRemoveFromGroup={onRemoveFromGroup}
      onMoveToPosition={onMoveToPosition}
      onEditSteps={onEditSteps}
      onDelete={onDelete}
      onPromoteToListElement={onPromoteToListElement}
      onToggleComment={onToggleComment}
      onCommentChange={onCommentChange}
      onCreateComment={onCreateComment}
      onCancelCreateComment={onCancelCreateComment}
      onToggleAddStandardItem={onToggleAddStandardItem}
      onAddElementById={onAddElementById}
      onAddElementsBySearch={onAddElementsBySearch}
      onCreateStandardElement={onCreateStandardElement}
      onCreateStandardElementGroup={onCreateStandardElementGroup}
      showPasteButton={showPasteButton}
      onBulkPasteStandardItems={onBulkPasteStandardItems}
      getElementForStandard={getElementForStandard}
      hasBetaAccess={hasBetaAccess} />
  );
}

StandardItem.propTypes = {
  standardItem: PropTypes.oneOfType([
    PropTypes.instanceOf(StandardElementModel),
    PropTypes.instanceOf(StandardElementGroupModel),
  ]).isRequired,
  standardItemsCount: PropTypes.number.isRequired,
  standardElementGroupsCount: PropTypes.number.isRequired,
  timeFormat: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  commentCollapsed: PropTypes.bool.isRequired,
  commentEntered: PropTypes.bool.isRequired,
  addStandardItemAboveCollapsed: PropTypes.bool.isRequired,
  addStandardItemBelowCollapsed: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  standardStatus: PropTypes.string.isRequired,
  disabledBulkEdit: PropTypes.bool.isRequired,
  childStandardItems: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsCommentCollapsed: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsCommentEntered: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsAddStandardItemBelowCollapsed: PropTypes.instanceOf(Map).isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onToggleStandardElementGroup: PropTypes.func.isRequired,
  onToggleSelectStandardElementsWithGroup: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToGroup: PropTypes.func.isRequired,
  onRemoveFromGroup: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onEditSteps: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPromoteToListElement: PropTypes.func.isRequired,
  onToggleComment: PropTypes.func.isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onCancelCreateComment: PropTypes.func.isRequired,
  onToggleAddStandardItem: PropTypes.func.isRequired,
  onToggleSelectStandardElement: PropTypes.func.isRequired,
  onAddElementById: PropTypes.func.isRequired,
  onAddElementsBySearch: PropTypes.func.isRequired,
  onCreateStandardElement: PropTypes.func.isRequired,
  onCreateStandardElementGroup: PropTypes.func.isRequired,
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
};
