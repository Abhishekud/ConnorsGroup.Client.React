import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';

export default class OrgHierarchyLevelEditorActions extends PureComponent {
  render() {
    const {disabled, onSave, onCancel} = this.props;

    return (
      <div className="header-actions">
        <Button bsStyle="primary" disabled={disabled} onClick={onSave}>Save</Button>
        <Button bsStyle="default" disabled={disabled} onClick={onCancel}>Cancel</Button>
      </div>
    );
  }
}

OrgHierarchyLevelEditorActions.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
