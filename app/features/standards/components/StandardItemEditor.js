import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import {StandardElementModel, StandardElementGroupModel} from '../models';
import StandardElementGroupEditor from './StandardElementGroupEditor';
import StandardElementEditor from './StandardElementEditor';
import {lowestElementStatus} from '../services';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {REORDER_STANDARDS_ITEMS} from '../actions';

export default function StandardItemEditor({
  standardItem, standardItemsCount, standardElementGroupsCount,
  timeFormat, collapsed, commentCollapsed, commentEntered, addStandardItemAboveCollapsed, disabled,
  childStandardItems, childStandardItemsCommentCollapsed, childStandardItemsCommentEntered,
  childStandardItemsValidationErrors,
  validationErrors,
  onSave, onCancel, onFieldChange, onToggleStandardElementGroup,
  onMove, onMoveToGroup, onRemoveFromGroup, onMoveToPosition,
  onDelete, onToggleComment, onToggleAddStandardItem, onAddElementById, onAddElementsBySearch, onCreateStandardElement,
  onCreateStandardElementGroup, onEditFrequencyFormula,
  unitsOfMeasure, onPromoteToListElement, addScrollNode,
  departmentId,
  onShowCreateUnitOfMeasure, onFilterChange, canManageStandardList, showPasteButton, onBulkPasteStandardItems,
  hasBetaAccess, standardId, getElementForStandard,
}) {
  if (standardItem.type === STANDARD_ELEMENT_GROUP) {
    const elementStatus = collapsed ? lowestElementStatus(childStandardItems.valueSeq()) : '';

    return (
      <Droppable droppableId={`${REORDER_STANDARDS_ITEMS}_${ standardItem.index.toString()}-${standardId}`} index={standardItem.index.toString()}
        type={`${REORDER_STANDARDS_ITEMS}_${ standardItem.index.toString()}-${standardId}`} >
        {provided => (
          <StandardElementGroupEditor
            provided={provided}
            disabled={disabled}
            standardElementGroup={standardItem}
            collapsed={collapsed}
            lowestElementStatus={elementStatus}
            addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
            validationErrors={validationErrors}
            canMove={standardItemsCount > childStandardItems.size + 1}
            addScrollNode={addScrollNode}
            onSave={onSave}
            onCancel={onCancel}
            onFieldChange={onFieldChange}
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
            hasBetaAccess={hasBetaAccess}
            getElementForStandard={getElementForStandard} >

            {childStandardItems.map(csi => {
              const standardItemId = csi.id;

              return (
                <Draggable key={standardItemId} draggableId={standardItemId.toString()} index={csi.get('index')} isDragDisabled={disabled}>
                  {(provided, snapshot) => (
                    <StandardElementEditor
                      key={standardItemId}
                      standardId={standardId}
                      showDragDropController
                      provided={provided}
                      snapshot={snapshot}
                      disabled={disabled}
                      standardElement={csi}
                      timeFormat={timeFormat}
                      commentCollapsed={childStandardItemsCommentCollapsed.get(standardItemId)}
                      commentEntered={childStandardItemsCommentEntered.get(standardItemId)}
                      addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
                      validationErrors={childStandardItemsValidationErrors.get(standardItemId, Map())}
                      canMove={standardItemsCount > 1}
                      standardElementGroupsCount={standardElementGroupsCount}
                      addScrollNode={addScrollNode}
                      onFieldChange={onFieldChange}
                      onFilterChange={onFilterChange}
                      onMove={onMove}
                      onMoveToGroup={onMoveToGroup}
                      onRemoveFromGroup={onRemoveFromGroup}
                      onMoveToPosition={onMoveToPosition}
                      onDelete={onDelete}
                      onPromoteToListElement={onPromoteToListElement}
                      onToggleComment={onToggleComment}
                      onToggleAddStandardItem={onToggleAddStandardItem}
                      onEditFrequencyFormula={onEditFrequencyFormula}
                      onAddElementById={onAddElementById}
                      onAddElementsBySearch={onAddElementsBySearch}
                      onCreateStandardElement={onCreateStandardElement}
                      onCreateStandardElementGroup={onCreateStandardElementGroup}
                      unitsOfMeasure={unitsOfMeasure}
                      departmentId={departmentId}
                      onShowCreateUnitOfMeasure={onShowCreateUnitOfMeasure}
                      canManageStandardList={canManageStandardList}
                      showPasteButton={showPasteButton}
                      onBulkPasteStandardItems={onBulkPasteStandardItems}
                      hasBetaAccess={hasBetaAccess}
                      getElementForStandard={getElementForStandard} />
                  )}
                </Draggable>
              );
            })}

          </StandardElementGroupEditor>
        )}
      </Droppable>
    );
  }

  return (
    <StandardElementEditor
      disabled={disabled}
      standardElement={standardItem}
      timeFormat={timeFormat}
      commentCollapsed={commentCollapsed}
      commentEntered={commentEntered}
      addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
      validationErrors={validationErrors}
      canMove={standardItemsCount > 1}
      standardElementGroupsCount={standardElementGroupsCount}
      addScrollNode={addScrollNode}
      onSave={onSave}
      onCancel={onCancel}
      onFieldChange={onFieldChange}
      onMove={onMove}
      onMoveToGroup={onMoveToGroup}
      onRemoveFromGroup={onRemoveFromGroup}
      onMoveToPosition={onMoveToPosition}
      onDelete={onDelete}
      onPromoteToListElement={onPromoteToListElement}
      onToggleComment={onToggleComment}
      onToggleAddStandardItem={onToggleAddStandardItem}
      onEditFrequencyFormula={onEditFrequencyFormula}
      onAddElementById={onAddElementById}
      onAddElementsBySearch={onAddElementsBySearch}
      onCreateStandardElement={onCreateStandardElement}
      onCreateStandardElementGroup={onCreateStandardElementGroup}
      unitsOfMeasure={unitsOfMeasure}
      onFilterChange={onFilterChange}
      onShowCreateUnitOfMeasure={onShowCreateUnitOfMeasure}
      canManageStandardList={canManageStandardList}
      showPasteButton={showPasteButton}
      onBulkPasteStandardItems={onBulkPasteStandardItems}
      hasBetaAccess={hasBetaAccess}
      getElementForStandard={getElementForStandard} />
  );
}

StandardItemEditor.propTypes = {
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
  disabled: PropTypes.bool.isRequired,
  childStandardItems: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsCommentCollapsed: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsCommentEntered: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsValidationErrors: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onToggleStandardElementGroup: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToGroup: PropTypes.func.isRequired,
  onRemoveFromGroup: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPromoteToListElement: PropTypes.func.isRequired,
  onToggleComment: PropTypes.func.isRequired,
  onToggleAddStandardItem: PropTypes.func.isRequired,
  onEditFrequencyFormula: PropTypes.func.isRequired,
  onAddElementById: PropTypes.func.isRequired,
  onAddElementsBySearch: PropTypes.func.isRequired,
  onCreateStandardElement: PropTypes.func.isRequired,
  onCreateStandardElementGroup: PropTypes.func.isRequired,
  unitsOfMeasure: PropTypes.array.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
};
