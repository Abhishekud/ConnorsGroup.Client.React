import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class StandardItemMoveControlsMenu extends PureComponent {

  render() {
    const {
      disabled, standardItemId, canMoveToGroup, canRemoveFromGroup, canPromoteToListElement,
      onMoveToTop, onMoveToBottom, onMoveToGroup, onRemoveFromGroup, onMoveToPosition,
      onDelete, onPromoteToListElement, canMove,
    } = this.props;

    return (
      <DropdownButton id={`context-menu-${standardItemId}`} bsStyle="link"
        disabled={disabled} title={<i className="fa fa-ellipsis-h" />} noCaret pullRight tabIndex={-1}>
        <MenuItem eventKey="1" onSelect={onMoveToTop} disabled={!canMove}>Move To Top</MenuItem>
        <MenuItem eventKey="2" onSelect={onMoveToBottom} disabled={!canMove}>Move To Bottom</MenuItem>
        {canMoveToGroup ? <MenuItem eventKey="3" onSelect={onMoveToGroup}>Move To Group</MenuItem> : null}
        <MenuItem eventKey="4" onSelect={onMoveToPosition} disabled={!canMove}>Move To Position</MenuItem>
        <MenuItem divider />
        {canPromoteToListElement ? <MenuItem eventKey="7" onSelect={onPromoteToListElement}>Promote to List Element</MenuItem> : null}
        {canRemoveFromGroup ? <MenuItem eventKey="8" onSelect={onRemoveFromGroup}>Remove From Group</MenuItem> : null}
        <MenuItem eventKey="9" onSelect={onDelete}>Delete</MenuItem>
      </DropdownButton>
    );
  }
}

StandardItemMoveControlsMenu.propTypes = {
  disabled: PropTypes.bool.isRequired,
  standardItemId: PropTypes.number.isRequired,
  canMove: PropTypes.bool.isRequired,
  canMoveToGroup: PropTypes.bool.isRequired,
  canRemoveFromGroup: PropTypes.bool.isRequired,
  canPromoteToListElement: PropTypes.bool.isRequired,
  onMoveToTop: PropTypes.func.isRequired,
  onMoveToBottom: PropTypes.func.isRequired,
  onMoveToGroup: PropTypes.func,
  onRemoveFromGroup: PropTypes.func,
  onMoveToPosition: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onPromoteToListElement: PropTypes.func,
};
