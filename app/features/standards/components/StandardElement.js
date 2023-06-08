import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {ABOVE, BELOW} from '../constants/addStandardItemPositions';
import {INLINE, STANDALONE} from '../constants/addStandardItemStyles';
import {STANDARD_ELEMENT} from '../constants/standardItemTypes';
import {ESTIMATE} from '../../elements/constants/elementTypes';
import {StandardElementModel} from '../models';
import StandardItemMoveControls from './StandardItemMoveControls';
import StandardElementComment from './StandardElementComment';
import AddStandardItem from './AddStandardItem';
import StandardElementDetails from './StandardElementDetails';
import StandardElementElementIdAndTime from './StandardElementElementIdAndTime';
import {statusClass} from '../constants/standardStatuses';
import {withRouter} from 'react-router';
import {getDynamicRoute} from '../../shared/services';

class StandardElement extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {onEdit, standardElement} = this.props;
    onEdit(standardElement);
  }

  handleEditSteps() {
    const {onEditSteps, standardElement} = this.props;
    onEditSteps(standardElement.id, standardElement.elementType);
  }

  handleToggleAddStandardItemAbove() {
    const {onToggleAddStandardItem, standardElement} = this.props;
    onToggleAddStandardItem(standardElement.id, ABOVE);
  }

  handleToggleAddStandardItemBelow() {
    const {onToggleAddStandardItem, standardElement} = this.props;
    onToggleAddStandardItem(standardElement.id, BELOW);
  }

  handleAddElementById(elementId, insertAtIndex) {
    const {onAddElementById, standardElement} = this.props;
    return onAddElementById(elementId, insertAtIndex, standardElement.standardElementGroupId);
  }

  handleAddElementsBySearch(insertAtIndex) {
    const {onAddElementsBySearch, standardElement} = this.props;
    return onAddElementsBySearch(insertAtIndex, standardElement.standardElementGroupId);
  }

  handleCreateStandardElement(insertAtIndex) {
    const {onCreateStandardElement, standardElement} = this.props;
    onCreateStandardElement(insertAtIndex, standardElement.standardElementGroupId);
  }

  handleSelectStandardElement() {
    const {onToggleSelectStandardElement, standardElement} = this.props;
    onToggleSelectStandardElement(standardElement.id);
  }

  handleBulkPasteStandardItems(insertAtIndex) {
    const {onBulkPasteStandardItems, standardElement} = this.props;
    onBulkPasteStandardItems(insertAtIndex, standardElement.standardElementGroupId);
  }

  handleOpenElement() {
    const {router, standardId, standardElement, location} = this.props;

    if (!standardElement.elementId) return;
    const route = getDynamicRoute(location, '', {standardElementType: standardElement.elementType, elementId: standardElement.elementId, standardId, standardElementId: standardElement.id});
    router.push(route);
  }

  render() {
    const {
      disabled, standardElement, timeFormat, commentCollapsed, commentEntered, disabledBulkEdit,
      addStandardItemAboveCollapsed, addStandardItemBelowCollapsed, canMove, standardElementGroupsCount, addScrollNode,
      onEdit, onMove, onMoveToGroup, onRemoveFromGroup, onMoveToPosition,
      onDelete, onPromoteToListElement, selectedStandardItems,
      onToggleComment, onCommentChange, onCreateComment, onCancelCreateComment, onCreateStandardElementGroup,
      showPasteButton, onBulkPasteStandardItems, provided, snapshot, showDragDropController, getElementForStandard, hasBetaAccess} = this.props;

    const canEditSteps = standardElement.elementId === null && standardElement.elementType !== ESTIMATE;
    const isSelectedForBulkEdit = selectedStandardItems.getIn([standardElement.id, 'selected']);
    return (
      <div ref={provided?.innerRef} className="standard-element-container"
        {...provided?.draggableProps}>
        <AddStandardItem
          autoFocus
          insertAtIndex={standardElement.index}
          style={STANDALONE}
          render={!standardElement.standardElementGroupId}
          disabled={disabled}
          collapsed={addStandardItemAboveCollapsed}
          closeable
          enableAddGroup
          onToggle={this.handleToggleAddStandardItemAbove}
          onAddElementById={this.handleAddElementById}
          onAddElementsBySearch={this.handleAddElementsBySearch}
          onCreateStandardElement={this.handleCreateStandardElement}
          onCreateStandardElementGroup={onCreateStandardElementGroup}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={onBulkPasteStandardItems}
          getElementForStandard={getElementForStandard} />

        <div id={`standard-item-${standardElement.id}`} className={`standard-element ${snapshot?.isDragging ? 'dragged-item-bg' : ''}`} ref={addScrollNode}>
          <div className="content">
            <div className="drag-icon-holder-div">
              {showDragDropController && <div {...provided?.dragHandleProps} className={`drag-icon-holder ${disabled ? 'disable-drag-icon-holder' : ''}`}><i className="fa fa-ellipsis-v" /></div>}
            </div>
            {disabledBulkEdit ? null
              : <div className="bulk-edit-checkbox">
                <i className={`fa ${isSelectedForBulkEdit ? 'fa-check-square-o' : 'fa-square-o'}`} onClick={this.handleSelectStandardElement} />
              </div>}

            <div className={`standard-item-index ${statusClass(standardElement.elementStatus)}`}>{standardElement.index}</div>

            <StandardElementElementIdAndTime
              standardElementId={standardElement.id}
              elementId={standardElement.elementId}
              measuredTimeMeasurementUnits={standardElement.measuredTimeMeasurementUnits}
              elementType={standardElement.elementType}
              timeFormat={timeFormat} />

            <div className="details-container">
              <div className="header">
                <span className={`${standardElement.elementId ? 'element-name' : ''}`} onClick={this.handleOpenElement}>{standardElement.name}</span>
                <span className="buttons">
                  {disabled || !onEdit ? null : <Button bsStyle="default" onClick={this.handleEdit}>Edit</Button>}
                  {canEditSteps ? <Button bsStyle="default" onClick={this.handleEditSteps}>{disabled ? 'View Steps' : 'Edit Steps'}</Button> : null}
                </span>
              </div>

              <StandardElementDetails
                standardElementId={standardElement.id}
                internal={standardElement.internal}
                machineAllowance={standardElement.machineAllowance}
                frequencyFormula={standardElement.frequencyFormula}
                frequencyValue={standardElement.frequencyValue}
                unitOfMeasureName={standardElement.unitOfMeasureName}
                normalTimeMeasurementUnits={standardElement.normalTimeMeasurementUnits}
                timeFormat={timeFormat}
                commentCollapsed={commentCollapsed}
                commentEntered={commentEntered}
                onToggleComment={onToggleComment}
                disabled={disabled}
                standardItemId={standardElement.id}
                standardItemType={STANDARD_ELEMENT}
                standardItemElementId={standardElement.elementId}
                standardItemElementType={standardElement.elementType}
                inStandardElementGroup={Boolean(standardElement.standardElementGroupId)}
                canMove={canMove}
                standardElementGroupsCount={standardElementGroupsCount}
                onMove={onMove}
                onMoveToGroup={onMoveToGroup}
                onRemoveFromGroup={onRemoveFromGroup}
                onMoveToPosition={onMoveToPosition}
                onDelete={onDelete}
                onPromoteToListElement={onPromoteToListElement}
                onAddItemAbove={this.handleToggleAddStandardItemAbove}
                onAddItemBelow={this.handleToggleAddStandardItemBelow}
                showAddItemAbove={!standardElement.standardElementGroupId}
                showAddItemBelow={Boolean(standardElement.standardElementGroupId)}
                canEdit={onEdit}
                canEditSteps={canEditSteps}
                onEdit={this.handleEdit}
                onEditSteps={this.handleEditSteps}
                hasBetaAccess={hasBetaAccess} />
            </div>

            <StandardItemMoveControls
              showMoveItemArrowController={!showDragDropController}
              disabled={disabled}
              standardItemId={standardElement.id}
              standardItemType={STANDARD_ELEMENT}
              standardItemElementId={standardElement.elementId}
              standardItemElementType={standardElement.elementType}
              inStandardElementGroup={Boolean(standardElement.standardElementGroupId)}
              canMove={canMove}
              standardElementGroupsCount={standardElementGroupsCount}
              onMove={onMove}
              onMoveToGroup={onMoveToGroup}
              onRemoveFromGroup={onRemoveFromGroup}
              onMoveToPosition={onMoveToPosition}
              onDelete={onDelete}
              onPromoteToListElement={onPromoteToListElement} />
          </div>

          <StandardElementComment
            standardElementId={standardElement.id}
            comment={standardElement.comment}
            collapsed={commentCollapsed}
            disabled={disabled}
            commentEntered={commentEntered}
            onFieldChange={onCommentChange}
            onCreate={onCreateComment}
            onCancel={onCancelCreateComment} />
        </div>

        <AddStandardItem
          autoFocus
          insertAtIndex={standardElement.index + 1}
          style={INLINE}
          render={Boolean(standardElement.standardElementGroupId)}
          disabled={disabled}
          collapsed={addStandardItemBelowCollapsed}
          closeable
          enableAddGroup={false}
          onToggle={this.handleToggleAddStandardItemBelow}
          onAddElementById={this.handleAddElementById}
          onAddElementsBySearch={this.handleAddElementsBySearch}
          onCreateStandardElement={this.handleCreateStandardElement}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={this.handleBulkPasteStandardItems}
          getElementForStandard={getElementForStandard}
          standardElementGroupId={standardElement.standardElementGroupId} />
      </div>
    );
  }
}

StandardElement.propTypes = {
  disabled: PropTypes.bool.isRequired,
  standardElement: PropTypes.instanceOf(StandardElementModel).isRequired,
  timeFormat: PropTypes.string.isRequired,
  commentCollapsed: PropTypes.bool.isRequired,
  commentEntered: PropTypes.bool.isRequired,
  addStandardItemAboveCollapsed: PropTypes.bool.isRequired,
  addStandardItemBelowCollapsed: PropTypes.bool.isRequired,
  canMove: PropTypes.bool.isRequired,
  standardElementGroupsCount: PropTypes.number.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onMove: PropTypes.func.isRequired,
  onMoveToGroup: PropTypes.func.isRequired,
  onRemoveFromGroup: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onEditSteps: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPromoteToListElement: PropTypes.func.isRequired,
  onToggleComment: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onCancelCreateComment: PropTypes.func.isRequired,
  onToggleAddStandardItem: PropTypes.func.isRequired,
  onAddElementById: PropTypes.func.isRequired,
  onAddElementsBySearch: PropTypes.func.isRequired,
  onCreateStandardElement: PropTypes.func.isRequired,
  onCreateStandardElementGroup: PropTypes.func.isRequired,
  onToggleSelectStandardElement: PropTypes.func.isRequired,
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
};

export default withRouter(StandardElement);
