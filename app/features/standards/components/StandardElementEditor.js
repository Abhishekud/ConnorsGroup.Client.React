import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {StandardElementModel} from '../models';
import {Button} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import StandardItemMoveControls from './StandardItemMoveControls';
import {TextInput} from '../../forms/components';
import StandardElementComment from './StandardElementComment';
import AddStandardItem from './AddStandardItem';
import {ABOVE} from '../constants/addStandardItemPositions';
import {STANDALONE} from '../constants/addStandardItemStyles';
import {STANDARD_ELEMENT} from '../constants/standardItemTypes';
import StandardElementElementIdAndTimeEditor from './StandardElementElementIdAndTimeEditor';
import StandardElementDetailsEditor from './StandardElementDetailsEditor';
import {statusClass} from '../constants/standardStatuses';
import {frequencyFormulaEditModes} from '../constants';

export default class StandardElementEditor extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSave() {
    const {onSave, standardElement} = this.props;
    onSave(standardElement);
  }

  handleCancel() {
    const {onCancel, standardElement} = this.props;
    onCancel(standardElement);
  }

  handleFieldChange(event) {
    const {onFieldChange, standardElement} = this.props;
    onFieldChange(standardElement.id, event);
  }

  handleToggleAddStandardItemAbove() {
    const {onToggleAddStandardItem, standardElement} = this.props;
    onToggleAddStandardItem(standardElement.id, ABOVE);
  }

  handleEditFormula() {
    const {onEditFrequencyFormula, standardElement} = this.props;
    onEditFrequencyFormula(standardElement.id, standardElement.frequencyFormula, frequencyFormulaEditModes.EDIT_STANDARD_ELEMENT_FREQUENCY);
  }

  render() {
    const {
      disabled, standardElement, timeFormat, validationErrors, commentCollapsed, commentEntered,
      addStandardItemAboveCollapsed, canMove, standardElementGroupsCount, addScrollNode,
      onCancel, onAddElementById, onAddElementsBySearch, onCreateStandardElement, onCreateStandardElementGroup,
      onMove, onMoveToGroup, onRemoveFromGroup, onMoveToPosition,
      onDelete, onToggleComment, onFieldChange, unitsOfMeasure, onPromoteToListElement,
      onShowCreateUnitOfMeasure, onFilterChange, canManageStandardList, showPasteButton, onBulkPasteStandardItems, hasBetaAccess,
      provided, snapshot, showDragDropController, getElementForStandard,
    } = this.props;
    const headerActions = (
      <div className="header-actions">
        <Button bsStyle="primary" disabled={disabled} onClick={this.handleSave}>Save</Button>
        <Button bsStyle="default" disabled={disabled} onClick={this.handleCancel}>Cancel</Button>
      </div>
    );

    return (
      <div ref={provided?.innerRef} className="standard-element-editor-container"
        {...provided?.draggableProps}>
        <AddStandardItem
          autoFocus
          insertAtIndex={standardElement.index}
          style={STANDALONE}
          render={!standardElement.standardElementGroupId}
          collapsed={addStandardItemAboveCollapsed} disabled={disabled} closeable enableAddGroup
          onToggle={this.handleToggleAddStandardItemAbove}
          onAddElementById={onAddElementById}
          onAddElementsBySearch={onAddElementsBySearch}
          onCreateStandardElement={onCreateStandardElement}
          onCreateStandardElementGroup={onCreateStandardElementGroup}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={onBulkPasteStandardItems}
          hasBetaAccess={hasBetaAccess}
          getElementForStandard={getElementForStandard} />

        <div id={`standard-item-${standardElement.id}`} className={`standard-element-editor ${snapshot?.isDragging ? 'dragged-item-bg' : ''}`} ref={addScrollNode}>
          <div className="content">
            <div className="drag-icon-holder-div">
              {showDragDropController && <div {...provided?.dragHandleProps} className={`drag-icon-holder ${disabled ? 'disable-drag-icon-holder' : ''}`}><i className="fa fa-ellipsis-v" /></div>}
            </div>
            <div className={`standard-item-index ${statusClass(standardElement.elementStatus)}`}>{standardElement.index}</div>

            <StandardElementElementIdAndTimeEditor
              standardElementId={standardElement.id}
              disabled={disabled}
              elementId={standardElement.elementId}
              elementType={standardElement.elementType}
              measuredTimeMeasurementUnits={standardElement.measuredTimeMeasurementUnits}
              timeFormat={timeFormat}
              validationErrors={validationErrors}
              onFieldChange={onFieldChange} />

            <div className="details-container">
              <div className="header">
                <TextInput
                  id={`name${standardElement.id}`} name="name" formGroupClassName="name" maxLength={256}
                  disabled={disabled} autoFocus={Boolean(onCancel)}
                  value={standardElement.name} onChange={this.handleFieldChange}
                  formValidationErrors={validationErrors} />
                {onCancel ? headerActions : null}
              </div>

              <StandardElementDetailsEditor
                disabled={disabled}
                standardElementId={standardElement.id}
                machineAllowance={standardElement.machineAllowance}
                internal={standardElement.internal}
                frequencyFormula={standardElement.frequencyFormula}
                unitOfMeasureId={standardElement.unitOfMeasureId}
                normalTimeMeasurementUnits={standardElement.normalTimeMeasurementUnits}
                elementType={standardElement.elementType}
                timeFormat={timeFormat}
                validationErrors={validationErrors}
                commentCollapsed={commentCollapsed}
                commentEntered={commentEntered}
                onToggleComment={onToggleComment}
                onFieldChange={onFieldChange}
                onFilterChange={onFilterChange}
                unitsOfMeasure={unitsOfMeasure}
                onEditFormula={this.handleEditFormula}
                onShowCreateUnitOfMeasure={onShowCreateUnitOfMeasure}
                canManageStandardList={canManageStandardList}
                editing
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
                hasBetaAccess={hasBetaAccess}
                showAddItemAbove={!standardElement.standardElementGroupId}
                onAddItemAbove={this.handleToggleAddStandardItemAbove} />
            </div>

            {hasBetaAccess ? <div className="move-controls" /> : <StandardItemMoveControls
              editing
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
              onPromoteToListElement={onPromoteToListElement} />}
          </div>

          <StandardElementComment
            standardElementId={standardElement.id}
            comment={standardElement.comment}
            collapsed={commentCollapsed}
            disabled={disabled}
            editing
            commentEntered={commentEntered}
            onFieldChange={onFieldChange} />
        </div>
      </div>
    );
  }
}

StandardElementEditor.propTypes = {
  disabled: PropTypes.bool.isRequired,
  standardElement: PropTypes.instanceOf(StandardElementModel).isRequired,
  timeFormat: PropTypes.string.isRequired,
  commentCollapsed: PropTypes.bool.isRequired,
  commentEntered: PropTypes.bool.isRequired,
  addStandardItemAboveCollapsed: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  canMove: PropTypes.bool.isRequired,
  standardElementGroupsCount: PropTypes.number.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onFieldChange: PropTypes.func.isRequired,
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
  onFilterChange: PropTypes.func.isRequired,
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
};
