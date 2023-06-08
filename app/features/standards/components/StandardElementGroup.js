import autoBind from 'react-autobind';
import classNames from 'classnames';
import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import {StandardElementGroupModel} from '../models';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {ABOVE, BELOW} from '../constants/addStandardItemPositions';
import {INLINE, STANDALONE} from '../constants/addStandardItemStyles';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import StandardItemMoveControls from './StandardItemMoveControls';
import AddStandardItem from './AddStandardItem';
import {statusClass, PRODUCTION, ARCHIVE} from '../constants/standardStatuses';

export default class StandardElementGroup extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {onEdit, standardElementGroup} = this.props;
    onEdit(standardElementGroup);
  }

  handleToggleAddStandardItemAbove() {
    const {onToggleAddStandardItem, standardElementGroup} = this.props;
    onToggleAddStandardItem(standardElementGroup.id, ABOVE);
  }

  handleToggleAddStandardItemBelow() {
    const {onToggleAddStandardItem, standardElementGroup, children} = this.props;
    if (!children.size) return;
    onToggleAddStandardItem(standardElementGroup.id, BELOW);
  }

  handleAddElementByIdInsideGroup(elementId, insertAtIndex) {
    const {onAddElementById, standardElementGroup} = this.props;
    return onAddElementById(elementId, insertAtIndex, standardElementGroup.id);
  }

  handleAddElementsBySearchInsideGroup(insertAtIndex) {
    const {onAddElementsBySearch, standardElementGroup} = this.props;
    return onAddElementsBySearch(insertAtIndex, standardElementGroup.id);
  }

  handleCreateStandardElementInsideGroup(insertAtIndex) {
    const {onCreateStandardElement, standardElementGroup} = this.props;
    onCreateStandardElement(insertAtIndex, standardElementGroup.id);
  }

  handleToggleSelectStandardElementsWithGroup() {
    const {childStandardItems, childStandardItemsStates, onToggleSelectStandardElementsWithGroup, standardElementGroup} = this.props;
    const rowCount = childStandardItems.size;
    const selectedCount = childStandardItemsStates.filter(x => x.get('selected')).size;
    onToggleSelectStandardElementsWithGroup(rowCount !== selectedCount, standardElementGroup.id);
  }

  handleBulkPasteStandardItems(insertAtIndex) {
    const {onBulkPasteStandardItems, standardElementGroup} = this.props;
    onBulkPasteStandardItems(insertAtIndex, standardElementGroup.id);
  }

  render() {
    const {
      disabled, standardElementGroup, collapsed, addStandardItemAboveCollapsed, addStandardItemBelowCollapsed,
      children, canMove, addScrollNode, lowestElementStatus, disabledBulkEdit, standardStatus,
      onToggleStandardElementGroup, onMove, onMoveToPosition, onDelete, childStandardItems, childStandardItemsStates,
      onAddElementById, onAddElementsBySearch, onCreateStandardElement, onCreateStandardElementGroup,
      showPasteButton, onBulkPasteStandardItems, provided, getElementForStandard, isGroupSelected} = this.props;

    const collapserClassNames = classNames(
      'collapser', 'clickable', 'fa',
      {
        'fa-caret-right': collapsed,
        'fa-caret-down': !collapsed,
      });

    const standardElementGroupClassNames = classNames('standard-element-group', {collapsed});
    const rowCount = childStandardItems.size;
    const selectedCount = childStandardItemsStates.filter(x => x.get('selected')).size;

    let faClass = 'fa-square-o';
    if (rowCount > 0 && selectedCount === rowCount) {
      faClass = 'fa-check-square-o';
    } else if (selectedCount > 0) {
      faClass = 'fa-minus-square-o';
    } else if (isGroupSelected) { //rowCount and selectedCount both are 0, i.e empty group
      faClass = 'fa-check-square-o';
    }

    return (
      <div className="standard-element-group-container">
        <AddStandardItem
          autoFocus
          insertAtIndex={standardElementGroup.index}
          style={STANDALONE}
          render={standardStatus !== PRODUCTION && standardStatus !== ARCHIVE}
          collapsed={addStandardItemAboveCollapsed}
          disabled={disabled}
          closeable
          enableAddGroup
          onToggle={this.handleToggleAddStandardItemAbove}
          onAddElementById={onAddElementById}
          onAddElementsBySearch={onAddElementsBySearch}
          onCreateStandardElement={onCreateStandardElement}
          onCreateStandardElementGroup={onCreateStandardElementGroup}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={onBulkPasteStandardItems}
          getElementForStandard={getElementForStandard} />

        <div id={`standard-item-${standardElementGroup.id}`} className={standardElementGroupClassNames} ref={addScrollNode}>
          <div className="content">
            <div className="drag-icon-holder-div" />
            {disabledBulkEdit ? null
              : <div className="bulk-edit-checkbox">
                <i className={`fa ${faClass}`} onClick={this.handleToggleSelectStandardElementsWithGroup} />
              </div>}

            <div className={`standard-item-index ${statusClass(lowestElementStatus)}`}>{standardElementGroup.index}</div>

            <div className="collapser-container">
              <i className={collapserClassNames} onClick={onToggleStandardElementGroup} />
            </div>
            <div className="header">
              <span>{standardElementGroup.name}</span>
              {disabled ? null : <Button bsStyle="default" onClick={this.handleEdit}>Edit</Button>}
            </div>

            <div className="normal-time" />

            <StandardItemMoveControls
              showMoveItemArrowController
              disabled={disabled}
              standardItemId={standardElementGroup.id}
              standardItemType={STANDARD_ELEMENT_GROUP}
              inStandardElementGroup={false}
              canMove={canMove}
              onMove={onMove}
              onMoveToPosition={onMoveToPosition}
              onDelete={onDelete} />
          </div>

          <AddStandardItem
            autoFocus={Boolean(children.size)}
            insertAtIndex={standardElementGroup.index + 1}
            style={INLINE}
            render={!collapsed && standardStatus !== PRODUCTION && standardStatus !== ARCHIVE}
            collapsed={collapsed || (addStandardItemBelowCollapsed && Boolean(children.size))}
            disabled={disabled}
            closeable={Boolean(children.size)}
            enableAddGroup={false}
            onToggle={this.handleToggleAddStandardItemBelow}
            onAddElementById={this.handleAddElementByIdInsideGroup}
            onAddElementsBySearch={this.handleAddElementsBySearchInsideGroup}
            onCreateStandardElement={this.handleCreateStandardElementInsideGroup}
            showPasteButton={showPasteButton}
            onBulkPasteStandardItems={this.handleBulkPasteStandardItems}
            getElementForStandard={getElementForStandard}
            standardElementGroupId={standardElementGroup.id} />

          <div ref={provided.innerRef}>
            {collapsed ? null : children.valueSeq()}
            {provided.placeholder}
          </div>
        </div>
      </div>
    );
  }
}

StandardElementGroup.propTypes = {
  disabled: PropTypes.bool.isRequired,
  standardElementGroup: PropTypes.instanceOf(StandardElementGroupModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  standardStatus: PropTypes.string.isRequired,
  lowestElementStatus: PropTypes.string,
  addStandardItemAboveCollapsed: PropTypes.bool.isRequired,
  addStandardItemBelowCollapsed: PropTypes.bool.isRequired,
  canMove: PropTypes.bool.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleStandardElementGroup: PropTypes.func.isRequired,
  onToggleSelectStandardElementsWithGroup: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleAddStandardItem: PropTypes.func.isRequired,
  onAddElementById: PropTypes.func.isRequired,
  onAddElementsBySearch: PropTypes.func.isRequired,
  onCreateStandardElement: PropTypes.func.isRequired,
  onCreateStandardElementGroup: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Map),
  childStandardItems: PropTypes.instanceOf(Map).isRequired,
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
  isGroupSelected: PropTypes.bool.isRequired,
};
